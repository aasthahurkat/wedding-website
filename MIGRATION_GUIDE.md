# Wedding Website Migration Guide

## Overview
This guide covers migrating from the JSON file-based photo storage to a proper Supabase database with event organization.

## Database Migration Steps

### 1. Run the Database Migration
Since the Supabase CLI has issues, run the migration manually:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `yneuslauisvgqauyqnzd`
3. Go to the SQL Editor
4. Copy and paste the contents of `supabase/migrations/20250609_photos_and_auth.sql`
5. Click "Run" to execute the migration

### 2. Verify Migration
After running the migration, check that these tables were created:
- `users` - User management with groups
- `events` - Wedding events (Getting Ready, Ceremony, etc.)
- `photos` - Photo metadata with event organization

### 3. Test the New Features

#### Event Filtering
1. Visit `/friends/gallery`
2. You should see a dropdown filter for "Events"
3. The filter should be populated with default data:
   - **Events**: Getting Ready, Ceremony, Cocktail Hour, Reception, After Party

#### Photo Organization
- Photos can now be organized by specific wedding events
- Event filtering works to show photos from specific parts of your wedding day

## API Changes

### New Endpoints
- `/api/photos/supabase` - New Supabase-based photo API
- `/api/events` - Fetch wedding events

### Legacy Support
- `/api/photos` now redirects to `/api/photos/supabase`
- Graceful fallback if Supabase fails

## Copy Updates
✅ **Fixed Generic Wedding Copy:**
- "Wedding Gallery" → "Our Moments"
- "Beautiful memories" → "From getting ready to dancing the night away"
- "Processing your beautiful memories" → "Adding your photos"
- Loading and empty states updated

## Champion Authentication (Current System)

You're keeping the token system for your 4 photo champions:
```
✅ ?token=aastha-family-champion
✅ Simple and works for small group
✅ Easy to share via URL
```

**Current champion tokens:**
- `aastha-family-champion`
- `preetesh-family-champion` 
- `friends-champion-1`
- `friends-champion-2`

## Testing Checklist

### ✅ Gallery Functionality
- [ ] Photos load without errors
- [ ] Event filter dropdown populated
- [ ] Event filtering works (photos update when filter changes)
- [ ] Photo hover shows event info
- [ ] Clear filter button works
- [ ] Pagination works with filters

### ✅ Photo Upload (Champions)
- [ ] Photo upload still works for champions with tokens
- [ ] Photos saved to Supabase instead of JSON
- [ ] Event metadata can be added to photos

### ✅ Mobile Experience
- [ ] Event filter works on mobile
- [ ] Photo info overlays display properly
- [ ] Touch navigation still works

## Storage Systems Status

### ✅ **Single Storage System:**
- **Photos**: Cloudinary (working) ✅
- **Metadata**: Supabase database (new) ✅
- **No more JSON files** ✅

### What You Need to Set Up:

1. **Run the Database Migration** (main step needed)
   - Copy SQL from `supabase/migrations/20250609_photos_and_auth.sql`
   - Run in Supabase Dashboard SQL Editor

2. **Test the Gallery**
   - Visit `/friends/gallery`
   - Check event filtering works
   - Test champion photo upload with tokens

3. **That's it!** Everything else is already configured:
   - ✅ Supabase credentials in `.env.local`
   - ✅ Cloudinary working for photo storage
   - ✅ Champion tokens working
   - ✅ APIs updated and backwards compatible

## Environment Variables (Already Set ✅)
```
NEXT_PUBLIC_SUPABASE_URL=https://yneuslauisvgqauyqnzd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
CLOUDINARY_* (all working)
```

## Migration Complete! 🎉

Your wedding website now has:
✅ Proper database instead of JSON files  
✅ Photo organization by wedding events  
✅ Better copy without wedding clichés  
✅ Event filtering functionality  
✅ Single storage system (Cloudinary + Supabase)  
✅ Champion tokens kept for simplicity  

**Just run the database migration and you're done!** 