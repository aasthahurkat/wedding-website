-- COPY AND PASTE THIS ENTIRE CONTENT INTO YOUR SUPABASE SQL EDITOR
-- Go to: https://supabase.com/dashboard/project/[your-project]/sql
-- Paste this content and click "Run"

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_group AS ENUM ('BRIDE', 'GROOM', 'FRIENDS');
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
  uploaded_by TEXT, -- Changed to TEXT to match your upload function
  taken_at TIMESTAMP WITH TIME ZONE,
  location TEXT,
  caption TEXT,
  
  -- Access control
  visible_to_groups user_group[] DEFAULT ARRAY['BRIDE', 'GROOM', 'FRIENDS']::user_group[],
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

-- RLS Policies for photos table (simplified for API access)
CREATE POLICY "Allow public read approved photos" ON public.photos
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow public insert photos" ON public.photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update photos" ON public.photos
  FOR UPDATE USING (true);

-- RLS Policies for events (read-only for all)
CREATE POLICY "Allow public read events" ON public.events
  FOR SELECT USING (true);

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

-- Success message
SELECT 'SUCCESS: All tables created! Your wedding photo gallery database is ready!' as status; 