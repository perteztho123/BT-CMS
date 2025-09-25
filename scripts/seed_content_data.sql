BEGIN;

-- 1. Add temporary column to hold migrated priority values
ALTER TABLE public.announcements
ADD COLUMN priority_new TEXT;

-- 2. Copy existing priority values into the new column
UPDATE public.announcements
SET priority_new = priority;

-- 3. (Optional) Inspect distinct values before proceeding
-- SELECT DISTINCT priority_new FROM public.announcements;

-- 4. Drop the existing CHECK constraint
ALTER TABLE public.announcements
DROP CONSTRAINT announcements_priority_check;

-- 5. Add new CHECK constraint allowing 'medium'
ALTER TABLE public.announcements
ADD CONSTRAINT announcements_priority_check_tmp
CHECK (
  priority_new = ANY (
    ARRAY['low', 'normal', 'medium', 'high', 'urgent']
  )
);

-- 6. Remove old priority column and promote the new one
ALTER TABLE public.announcements
DROP COLUMN priority;

ALTER TABLE public.announcements
RENAME COLUMN priority_new TO priority;

-- 7. Rename the new constraint to match the original name
ALTER TABLE public.announcements
RENAME CONSTRAINT announcements_priority_check_tmp
TO announcements_priority_check;

COMMIT;

-- Insert sample announcements
INSERT INTO public.announcements (
  title,
  content,
  category,
  priority,
  published,
  featured_image,
  created_by,
  status
) VALUES
-- Emergency Alert
('Tropical Storm Juanito Advisory',
 'Residents are advised to take necessary precautions as Tropical Storm Juanito approaches our region. Stay indoors and monitor official weather updates.',
 'emergency', 'high', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- Community Event
('Annual Christmas Festival',
 'Join us for our annual Christmas Festival featuring local vendors, food stalls, and entertainment for the whole family.',
 'event', 'medium', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- General Notice
('New Waste Collection Schedule',
 'Starting January 2025, our waste collection schedule will be adjusted to better serve all barangays. Please check the new schedule posted in your barangay halls.',
 'general', 'medium', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- Municipal Update
('Mayor''s Monthly Address',
 'Watch the Mayor''s latest monthly address discussing recent developments and upcoming projects in our municipality.',
 'general', 'low', false, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'draft'),

-- Health Initiative
('Barangay Health Fair This Weekend',
 'Free medical checkups, dental services, and wellness seminars will be available at the Barangay Health Fair this Saturday and Sunday.',
 'event', 'normal', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- Preparedness Drill
('Flood Preparedness Drill Scheduled',
 'A municipal-wide flood preparedness drill will be conducted next week. All barangay officials and volunteers are encouraged to participate.',
 'emergency', 'urgent', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- Utility Notice
('Power Interruption Notice',
 'Scheduled maintenance will cause power interruptions in several barangays on October 3 from 8 AM to 5 PM. Please plan accordingly.',
 'general', 'high', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published'),

-- Volunteer Call
('Coastal Cleanup Drive',
 'Join our coastal cleanup drive this October 10 to help preserve our marine ecosystems. Volunteers will receive certificates and snacks.',
 'event', 'normal', true, NULL,
 (SELECT id FROM auth.users WHERE email LIKE '%@mdrrmo.gov.ph' LIMIT 1),
 'published');
