-- Migration: Remove outfit_help column from rsvps table
-- This column was removed from the RSVP form to simplify the user experience

-- First, let's see what's in the table (optional - for verification)
-- SELECT outfit_help, COUNT(*) FROM rsvps GROUP BY outfit_help;

-- Remove the outfit_help column
ALTER TABLE rsvps DROP COLUMN IF EXISTS outfit_help;

-- Verify the column is removed (optional)
-- \d rsvps 