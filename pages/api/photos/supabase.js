import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use service role for API operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetPhotos(req, res);
  } else if (req.method === 'POST') {
    return handleUploadPhoto(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetPhotos(req, res) {
  try {
    const { 
      group, 
      page = 1, 
      limit = 50,
      featured_only = false 
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build the query with filters - removed users join since relationship doesn't exist
    let query = supabase
      .from('photos')
      .select(`
        id,
        filename,
        original_name,
        url,
        provider,
        file_size,
        width,
        height,
        taken_at,
        caption,
        is_featured,
        created_at,
        uploaded_by
      `)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    // Apply filters
    if (group) {
      query = query.contains('visible_to_groups', [group.toUpperCase()]);
    }

    if (featured_only === 'true') {
      query = query.eq('is_featured', true);
    }

    const { data: photos, error, count } = await query;

    if (error) {
      console.error('Error fetching photos:', error);
      return res.status(500).json({ error: 'Failed to fetch photos' });
    }

    // Transform the data to match the expected format
    const transformedPhotos = photos.map(photo => ({
      id: photo.id,
      fileName: photo.filename,
      originalName: photo.original_name,
      url: photo.url,
      provider: photo.provider,
      fileSize: photo.file_size,
      width: photo.width,
      height: photo.height,
      takenAt: photo.taken_at,
      caption: photo.caption,
      isFeatured: photo.is_featured,
      createdAt: photo.created_at,
      uploadedBy: photo.uploaded_by || 'Unknown'
    }));

    res.status(200).json({
      photos: transformedPhotos,
      totalCount: photos.length,
      page: parseInt(page),
      limit: parseInt(limit),
      hasMore: photos.length === parseInt(limit)
    });

  } catch (error) {
    console.error('Photos API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleUploadPhoto(req, res) {
  try {
    const {
      filename,
      originalName,
      url,
      provider,
      cloudinaryId,
      fileSize,
      width,
      height,
      format,
      uploadedBy,
      takenAt,
      caption,
      visibleToGroups = ['BRIDE', 'GROOM', 'FRIENDS']
    } = req.body;

    // Insert the photo
    const { data: photo, error: photoError } = await supabase
      .from('photos')
      .insert({
        filename,
        original_name: originalName,
        url,
        provider: provider || 'CLOUDINARY',
        cloudinary_id: cloudinaryId,
        file_size: fileSize,
        width,
        height,
        format,
        uploaded_by: uploadedBy,
        taken_at: takenAt,
        caption,
        visible_to_groups: visibleToGroups,
        is_approved: true
      })
      .select()
      .single();

    if (photoError) {
      console.error('Error inserting photo:', photoError);
      return res.status(500).json({ error: 'Failed to save photo' });
    }

    res.status(201).json({
      success: true,
      photo: {
        id: photo.id,
        url: photo.url,
        filename: photo.filename
      }
    });

  } catch (error) {
    console.error('Upload photo API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to get events for the frontend
export async function getEvents() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return events;
} 