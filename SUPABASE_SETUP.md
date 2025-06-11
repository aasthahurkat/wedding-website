# Supabase Setup Guide for Wedding Website Photo Gallery

## 1. Environment Variables Setup

Copy `.env.local.example` to `.env.local` and fill in your actual values:

```bash
cp .env.local.example .env.local
```

Get your values from: https://supabase.com/dashboard/project/[your-project]/settings/api

## 2. Database Table Setup

In your Supabase SQL Editor, run this query to create the gallery table:

```sql
-- Create the gallery_photos table with approval system
CREATE TABLE gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  url TEXT NOT NULL,
  file_path TEXT,
  uploaded_by TEXT NOT NULL,
  uploader_name TEXT,
  uploader_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT,
  rejection_reason TEXT
);

-- Enable Row Level Security
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policies - only show approved photos to public
CREATE POLICY "Allow public read approved photos" ON gallery_photos
  FOR SELECT USING (status = 'approved');

-- Allow anyone to insert photos (they'll be pending by default)
CREATE POLICY "Allow public insert pending photos" ON gallery_photos
  FOR INSERT WITH CHECK (status = 'pending');

-- Only admin can update photo status
CREATE POLICY "Allow admin update status" ON gallery_photos
  FOR UPDATE USING (true);

-- Allow admin to see all photos
CREATE POLICY "Allow admin read all photos" ON gallery_photos
  FOR SELECT USING (true);
```

## 3. Admin Panel Setup

Create an admin environment variable for yourself:

```bash
# Add to your .env.local
ADMIN_EMAIL=your-email@example.com
```

## 4. Storage Bucket Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `gallery-photos`
3. Make it public by clicking the bucket → Settings → Make Public

Or use SQL:

```sql
-- Create storage bucket (IMPORTANT: Use exact name "gallery-photos")
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-photos', 'gallery-photos', true);

-- Create storage policies for public access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-photos');
CREATE POLICY "Anyone can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-photos');
CREATE POLICY "Anyone can delete" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-photos');
```

**CRITICAL**: The bucket name must be exactly `gallery-photos` (not `wedding-gallery` or `wedding-photos`). The code is configured to use this specific bucket name.

## 5. Supabase Free Tier Limits

Your free tier includes:

- **Database**: Up to 500MB
- **Storage**: Up to 1GB
- **Bandwidth**: Up to 2GB per month
- **API requests**: Up to 50,000 per month

### For a Wedding Website:

- **Estimated photo storage**: ~20-50 photos at ~2-5MB each = 100-250MB
- **Should be fine** for your wedding with ~1600 guests and selective photo sharing
- **Monitor usage** in your Supabase dashboard

### Alternative Free Options (if needed):

1. **Cloudinary** - 25GB bandwidth, 25,000 transformations/month
2. **Imgur API** - Unlimited uploads, may have terms restrictions
3. **Firebase Storage** - 1GB storage, 10GB bandwidth/month
4. **Vercel Blob** - 500GB bandwidth on hobby plan

## 6. Troubleshooting

### "Row violates row-level security policy" Error:

This happens when RLS is enabled but no policies allow the operation. Make sure you ran the policy creation SQL above.

### "TypeError: Failed to fetch" Error:

This usually means:

1. **Environment variables not set**: Check your `.env.local` file
2. **Bucket doesn't exist**: Create the `gallery-photos` bucket
3. **Wrong bucket name**: Make sure you're using `gallery-photos` not `wedding-gallery`
4. **CORS issues**: Make sure your Supabase project allows your domain

### Photos not showing after upload:

1. Check browser console for errors
2. Verify your environment variables are set correctly
3. Check if the storage bucket is public
4. Make sure the database policies allow SELECT operations
5. **Check bucket name consistency**: Both upload and fetch must use same bucket name

### Testing Your Setup:

1. Visit `/friends/gallery` on your website
2. Try uploading a small test image
3. Check your Supabase dashboard to see if the record appears
4. If you see a Next.js image hostname error, the Supabase domain should be automatically configured

### Next.js Image Configuration:

The `next.config.js` file should include your Supabase hostname for images to display properly:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      port: '',
      pathname: '/storage/v1/object/public/**',
    },
  ],
  domains: [
    'your-project-id.supabase.co', // Your specific Supabase domain
  ],
}
```

## 7. Security Considerations

The current setup allows anyone to upload/delete photos. For production, consider:

1. **Authentication**: Add user authentication
2. **File type restrictions**: Already implemented (images only)
3. **File size limits**: Already implemented (5MB)
4. **Rate limiting**: Already implemented in middleware
5. **Content moderation**: Consider adding image scanning

## 8. Monitoring Usage

Monitor your Supabase usage at:

- Dashboard → Settings → Usage
- Set up usage alerts for approaching limits

If you exceed limits, you can:

1. Upgrade to Pro plan ($25/month)
2. Switch to alternative storage solution
3. Implement image compression/optimization
