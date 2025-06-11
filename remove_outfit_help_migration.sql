-- Migration to remove outfit_help column from rsvps table
-- Run this in your Supabase SQL Editor

-- Remove the outfit_help column from the rsvps table
ALTER TABLE public.rsvps DROP COLUMN IF EXISTS outfit_help;

-- Verify the change
SELECT 'SUCCESS: outfit_help column removed from rsvps table' as status; 