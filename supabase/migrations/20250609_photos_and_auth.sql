-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_group AS ENUM ('BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS');
CREATE TYPE photo_provider AS ENUM ('CLOUDINARY', 'AWS_S3', 'LOCAL');

-- Users table with proper group-based access
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  user_group user_group NOT NULL,
  invitation_code TEXT UNIQUE,
  phone TEXT,
  is_photo_champion BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table for organizing photos
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default wedding events
INSERT INTO public.events (name, description, event_date, location) VALUES
  ('Getting Ready', 'Bridal party and groomsmen preparations', '2025-06-15', 'Hotel Suites'),
  ('Ceremony', 'Wedding ceremony', '2025-06-15', 'Main Venue'),
  ('Cocktail Hour', 'Drinks and mingling', '2025-06-15', 'Garden Terrace'),
  ('Reception', 'Dinner and dancing', '2025-06-15', 'Ballroom'),
  ('After Party', 'Late night celebrations', '2025-06-15', 'Hotel Lounge');

-- Photos table with proper organization
CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  url TEXT NOT NULL,
  provider photo_provider NOT NULL DEFAULT 'CLOUDINARY',
  cloudinary_id TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  format TEXT,
  
  -- Organization fields
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  taken_at TIMESTAMP WITH TIME ZONE,
  location TEXT,
  caption TEXT,
  
  -- Access control
  visible_to_groups user_group[] DEFAULT ARRAY['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS']::user_group[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  exif_data JSONB,
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_photos_event_id ON public.photos(event_id);
CREATE INDEX idx_photos_uploaded_by ON public.photos(uploaded_by);
CREATE INDEX idx_photos_taken_at ON public.photos(taken_at DESC);
CREATE INDEX idx_photos_visible_to_groups ON public.photos USING GIN(visible_to_groups);
CREATE INDEX idx_photos_created_at ON public.photos(created_at DESC);
CREATE INDEX idx_users_user_group ON public.users(user_group);
CREATE INDEX idx_users_invitation_code ON public.users(invitation_code);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for photos table
CREATE POLICY "Users can view photos for their group" ON public.photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.user_group = ANY(photos.visible_to_groups)
    )
  );

CREATE POLICY "Photo champions can insert photos" ON public.photos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.is_photo_champion = true
    )
  );

CREATE POLICY "Users can update their own uploaded photos" ON public.photos
  FOR UPDATE USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.is_photo_champion = true
    )
  );

-- RLS Policies for events (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view events" ON public.events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Functions for updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_photos_updated_at
  BEFORE UPDATE ON public.photos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to get photos with event information
CREATE OR REPLACE FUNCTION public.get_photos_with_metadata(
  user_group_filter user_group DEFAULT NULL,
  event_filter UUID DEFAULT NULL,
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  filename TEXT,
  original_name TEXT,
  url TEXT,
  provider photo_provider,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  event_name TEXT,
  event_date DATE,
  uploaded_by_name TEXT,
  taken_at TIMESTAMP WITH TIME ZONE,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.filename,
    p.original_name,
    p.url,
    p.provider,
    p.file_size,
    p.width,
    p.height,
    e.name as event_name,
    e.event_date,
    u.name as uploaded_by_name,
    p.taken_at,
    p.caption,
    p.created_at
  FROM public.photos p
  LEFT JOIN public.events e ON p.event_id = e.id
  LEFT JOIN public.users u ON p.uploaded_by = u.id
  WHERE (user_group_filter IS NULL OR user_group_filter = ANY(p.visible_to_groups))
    AND (event_filter IS NULL OR p.event_id = event_filter)
    AND p.is_approved = true
  ORDER BY p.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 