import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migratePhotosToSupabase() {
  console.log('🚀 Starting photo migration from JSON to Supabase...\n');

  try {
    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'data', 'photos.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    console.log(`📂 Found ${jsonData.photos.length} photos in JSON file\n`);

    // Check which photos already exist in Supabase
    const { data: existingPhotos, error: checkError } = await supabase
      .from('photos')
      .select('filename');

    if (checkError) {
      console.error('❌ Error checking existing photos:', checkError);
      return;
    }

    const existingFileNames = new Set(existingPhotos.map(p => p.filename));
    console.log(`🗄️  Found ${existingPhotos.length} photos already in Supabase\n`);

    let migratedCount = 0;
    let skippedCount = 0;

    // Process each photo from JSON
    for (const photo of jsonData.photos) {
      // Skip if already exists
      if (existingFileNames.has(photo.fileName)) {
        console.log(`⏭️  Skipping ${photo.fileName} (already exists)`);
        skippedCount++;
        continue;
      }

      // Map group to uppercase array format
      const groupMapping = {
        'friends': ['FRIENDS'],
        'bride': ['BRIDE'],
        'groom': ['GROOM'],
        'family': ['BRIDE', 'GROOM']
      };
      
      const visibleToGroups = groupMapping[photo.group] || ['BRIDE', 'GROOM', 'FRIENDS'];

      // Prepare photo data for Supabase
      const photoData = {
        filename: photo.fileName,
        original_name: photo.originalName,
        url: photo.url,
        provider: photo.provider || 'CLOUDINARY',
        cloudinary_id: photo.metadata?.cloudinaryId,
        file_size: photo.fileSize,
        width: photo.metadata?.width,
        height: photo.metadata?.height,
        format: photo.metadata?.format,
        uploaded_by: photo.uploadedBy,
        taken_at: photo.metadata?.timestamp ? new Date(photo.metadata.timestamp).toISOString() : null,
        caption: null,
        visible_to_groups: visibleToGroups,
        is_approved: true,
        is_featured: false,
        created_at: photo.createdAt || new Date().toISOString()
      };

      // Insert into Supabase
      const { data: insertedPhoto, error: insertError } = await supabase
        .from('photos')
        .insert(photoData)
        .select()
        .single();

      if (insertError) {
        console.error(`❌ Error migrating ${photo.fileName}:`, insertError);
        continue;
      }

      console.log(`✅ Migrated: ${photo.fileName}`);
      migratedCount++;
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Migrated: ${migratedCount} photos`);
    console.log(`   ⏭️  Skipped: ${skippedCount} photos (already existed)`);
    console.log(`   📁 Total in JSON: ${jsonData.photos.length} photos`);

    // Verify final count
    const { data: finalPhotos, error: finalError } = await supabase
      .from('photos')
      .select('id');

    if (!finalError) {
      console.log(`   🗄️  Total in Supabase: ${finalPhotos.length} photos`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n💡 You can now see all photos in your gallery.');
    console.log('💡 The JSON file is kept as backup - you can delete it later if desired.');

  } catch (error) {
    console.error('💥 Migration failed:', error);
  }
}

migratePhotosToSupabase(); 