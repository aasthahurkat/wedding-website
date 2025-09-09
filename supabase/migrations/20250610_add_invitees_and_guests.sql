-- Add INVITEES and GUESTS to the user_group enum
ALTER TYPE user_group ADD VALUE 'INVITEES';
ALTER TYPE user_group ADD VALUE 'GUESTS';

-- Update default visible_to_groups to include the new groups
ALTER TABLE photos 
ALTER COLUMN visible_to_groups 
SET DEFAULT ARRAY['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS']::user_group[];
