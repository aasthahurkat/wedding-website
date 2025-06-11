import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photoId, confirm } = req.body;

    // Safety check
    if (!confirm) {
      return res.status(400).json({ 
        error: 'Confirmation required',
        message: 'Add "confirm": true to proceed with deletion'
      });
    }

    if (!photoId) {
      return res.status(400).json({ error: 'Photo ID is required' });
    }

    // 1. Get photo details from Supabase
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .single();

    if (fetchError || !photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    console.log(`🗑️  Deleting photo: ${photo.filename} (${photo.provider})`);

    let cloudinaryDeleted = false;
    let supabaseStorageDeleted = false;
    let localJsonUpdated = false;

    // 2. Delete from Cloudinary (if stored there)
    if (photo.provider === 'CLOUDINARY' && photo.cloudinary_id) {
      try {
        const cloudinaryResult = await cloudinary.uploader.destroy(photo.cloudinary_id);
        cloudinaryDeleted = cloudinaryResult.result === 'ok';
        console.log(`☁️  Cloudinary deletion: ${cloudinaryDeleted ? 'Success' : 'Failed'}`);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
      }
    }

    // 3. Delete from Supabase Storage (if stored there)
    if (photo.provider === 'SUPABASE') {
      try {
        // Extract file path from URL
        const urlParts = photo.url.split('/storage/v1/object/public/gallery-photos/');
        const filePath = urlParts[1];
        
        if (filePath) {
          const { error: storageError } = await supabase.storage
            .from('gallery-photos')
            .remove([filePath]);
          
          supabaseStorageDeleted = !storageError;
          console.log(`🗄️  Supabase storage deletion: ${supabaseStorageDeleted ? 'Success' : 'Failed'}`);
          if (storageError) console.error('Supabase storage delete error:', storageError);
        }
      } catch (storageError) {
        console.error('Supabase storage delete error:', storageError);
      }
    }

    // 4. Delete from Supabase photos table
    const { error: dbDeleteError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId);

    if (dbDeleteError) {
      console.error('Database delete error:', dbDeleteError);
      return res.status(500).json({ error: 'Failed to delete from database' });
    }

    // 5. Remove from local JSON file (optional cleanup)
    try {
      const jsonPath = path.join(process.cwd(), 'data', 'photos.json');
      if (fs.existsSync(jsonPath)) {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const originalCount = jsonData.photos.length;
        
        // Filter out photos with matching filename or URL
        jsonData.photos = jsonData.photos.filter(p => 
          p.fileName !== photo.filename && 
          p.url !== photo.url
        );
        
        if (jsonData.photos.length < originalCount) {
          fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
          localJsonUpdated = true;
          console.log(`📄 Local JSON updated: ${localJsonUpdated ? 'Success' : 'No changes'}`);
        }
      }
    } catch (jsonError) {
      console.error('JSON update error:', jsonError);
    }

    // 6. Also clean up from gallery_photos table if it exists there
    try {
      await supabase
        .from('gallery_photos')
        .delete()
        .eq('file_name', photo.original_name);
    } catch (galleryError) {
      // Ignore errors here as this is just cleanup
    }

    const summary = {
      photoId: photo.id,
      filename: photo.filename,
      provider: photo.provider,
      deletions: {
        database: true,
        cloudinary: photo.provider === 'CLOUDINARY' ? cloudinaryDeleted : 'N/A',
        supabaseStorage: photo.provider === 'SUPABASE' ? supabaseStorageDeleted : 'N/A',
        localJson: localJsonUpdated,
        galleryPhotosTable: 'Attempted cleanup'
      }
    };

    console.log('✅ Photo deletion completed:', summary);

    res.status(200).json({
      success: true,
      message: 'Photo deleted successfully',
      summary
    });

  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 