import { selectStorageProvider, uploadToProvider, updateStorageUsage } from '../../../lib/storage';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Path to store photo metadata (legacy fallback)
const PHOTOS_DB_PATH = path.join(process.cwd(), 'data', 'photos.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize photos database if it doesn't exist
if (!fs.existsSync(PHOTOS_DB_PATH)) {
  fs.writeFileSync(PHOTOS_DB_PATH, JSON.stringify({ photos: [] }, null, 2));
}

function loadPhotos() {
  try {
    const data = fs.readFileSync(PHOTOS_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading photos:', error);
    return { photos: [] };
  }
}

function savePhotos(photosData) {
  try {
    fs.writeFileSync(PHOTOS_DB_PATH, JSON.stringify(photosData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving photos:', error);
    return false;
  }
}

async function saveToSupabase(photoData) {
  try {
    const { data, error } = await supabase
      .from('photos')
      .insert({
        filename: photoData.fileName,
        original_name: photoData.originalName,
        url: photoData.url,
        provider: photoData.provider || 'CLOUDINARY',
        cloudinary_id: photoData.metadata?.cloudinaryId,
        file_size: photoData.fileSize,
        width: photoData.metadata?.width,
        height: photoData.metadata?.height,
        format: photoData.metadata?.format,
        uploaded_by: photoData.uploadedBy,
        taken_at: photoData.metadata?.takenAt,
        caption: photoData.caption,
        visible_to_groups: ['BRIDE', 'GROOM', 'FRIENDS'],
        is_approved: true,
        metadata: photoData.metadata
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase save error:', error);
      return { success: false, error };
    }

    console.log('Successfully saved to Supabase:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('Supabase save exception:', error);
    return { success: false, error };
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse form data
      const form = formidable({
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
        keepExtensions: true,
      });

      const [fields, files] = await form.parse(req);
      const uploaderToken = fields.uploaderToken?.[0];
      const group = fields.group?.[0];

      // Validate champion token
      const validTokens = {
        'shreyas-sakshi': 'Shreyas & Sakshi',
        'kajal-niyati': 'Kajal & Niyati', 
        'rajdeep': 'Rajdeep',
        'cousins': 'Cousins'
      };
      
      if (!validTokens[uploaderToken]) {
        return res.status(403).json({ error: 'Invalid champion token' });
      }

      // Process uploaded files
      const uploadedPhotos = [];
      const photoFiles = files.photo || [];
      const photoArray = Array.isArray(photoFiles) ? photoFiles : [photoFiles];

      for (const photo of photoArray) {
        if (!photo) continue;

        try {
          // Read file buffer
          const fileBuffer = fs.readFileSync(photo.filepath);
          const fileSize = fileBuffer.length;

          // Select optimal storage provider
          const storageProvider = selectStorageProvider(fileSize, 'photo');
          
          console.log(`Uploading to ${storageProvider.provider} - ${fileSize} bytes`);

          // Create unique filename
          const timestamp = Date.now();
          const fileName = `${timestamp}-${photo.originalFilename}`;

          // Upload to storage provider
          const uploadResult = await uploadToProvider(storageProvider, fileBuffer, fileName, {
            uploadedBy: validTokens[uploaderToken],
            group: group,
            originalName: photo.originalFilename,
            timestamp: timestamp
          });

          if (uploadResult.success) {
            // Update storage usage tracking
            updateStorageUsage(storageProvider.provider, uploadResult.fileSize);

            // Create photo record
            const photoRecord = {
              id: `photo_${timestamp}_${Math.random().toString(36).substring(7)}`,
              fileName: fileName,
              originalName: photo.originalFilename,
              url: uploadResult.url,
              provider: uploadResult.provider,
              uploadedBy: validTokens[uploaderToken],
              group: group,
              fileSize: uploadResult.fileSize,
              metadata: uploadResult.metadata,
              createdAt: new Date().toISOString()
            };

            // Save to Supabase database (primary)
            const supabaseResult = await saveToSupabase(photoRecord);
            
            if (supabaseResult.success) {
              console.log(`Successfully uploaded: ${fileName} to ${uploadResult.provider} and Supabase`);
              uploadedPhotos.push(photoRecord);
            } else {
              console.error('Supabase save failed, falling back to JSON file');
              
              // Fallback to JSON file if Supabase fails
              const photosData = loadPhotos();
              photosData.photos.push(photoRecord);
              
              if (savePhotos(photosData)) {
                uploadedPhotos.push(photoRecord);
                console.log(`Successfully uploaded: ${fileName} to ${uploadResult.provider} and JSON file (fallback)`);
              } else {
                console.error('Both Supabase and JSON file saves failed');
              }
            }
          }

          // Clean up temp file
          fs.unlinkSync(photo.filepath);

        } catch (uploadError) {
          console.error('Upload error for photo:', uploadError);
          
          // Clean up temp file on error  
          if (fs.existsSync(photo.filepath)) {
            fs.unlinkSync(photo.filepath);
          }
          
          // Continue with other photos instead of failing completely
          console.error(`Skipping ${photo.originalFilename} due to error:`, uploadError.message);
        }
      }

      if (uploadedPhotos.length === 0) {
        return res.status(500).json({ error: 'No photos were uploaded successfully. Please check your storage configuration.' });
      }

      return res.status(200).json({ 
        message: `Successfully uploaded ${uploadedPhotos.length} photo(s)`,
        photos: uploadedPhotos,
        count: uploadedPhotos.length
      });

    } catch (error) {
      console.error('Upload handler error:', error);
      return res.status(500).json({ 
        error: 'Upload failed', 
        details: error.message 
      });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
}; 