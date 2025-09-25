-- Initial Hotline Numbers
-- Essential emergency and government contact numbers
-- Created: 2025-01-27

INSERT INTO public.hotline_numbers (service_name, primary_number, secondary_number, description, category, is_24_7, status, created_by) VALUES
-- Emergency Services
('National Emergency Hotline', '911', NULL, 'National emergency hotline for all types of emergencies', 'emergency', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Philippine Red Cross', '143', '(02) 8527-0000', 'Emergency medical services and disaster response', 'medical', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Bureau of Fire Protection', '116', '(02) 8426-0219', 'Fire emergency and rescue services', 'fire', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Philippine National Police', '117', '(02) 8722-0650', 'Police emergency and crime reporting', 'police', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

-- Medical Services
('Department of Health', '(02) 8651-7800', '1555', 'Health information and medical assistance', 'medical', false, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Philippine General Hospital', '(02) 8554-8400', NULL, 'Major government hospital emergency services', 'medical', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('National Kidney and Transplant Institute', '(02) 8981-0300', NULL, 'Specialized medical services', 'medical', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

-- Rescue and Emergency Response
('Metropolitan Manila Development Authority', '136', '(02) 8882-4150', 'Traffic and flood rescue operations', 'rescue', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Philippine Coast Guard', '(02) 8527-8481', '143', 'Maritime search and rescue operations', 'rescue', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('National Disaster Risk Reduction and Management Council', '(02) 8911-1406', '(02) 8912-2665', 'Disaster response coordination', 'emergency', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

-- Utilities
('Manila Electric Company (MERALCO)', '16211', '(02) 16211', 'Power outage and electrical emergency reporting', 'utility', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Manila Water', '1627', '(02) 1627', 'Water service interruption and emergency repairs', 'utility', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Maynilad Water Services', '1626', '(02) 1626', 'Water service issues and emergency repairs', 'utility', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

-- Government Services
('Barangay Hall', '(02) 8XXX-XXXX', NULL, 'Local barangay emergency response and services', 'government', false, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('City Hall Emergency Operations Center', '(02) 8XXX-XXXX', NULL, 'City-level emergency coordination', 'government', true, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),
('Department of Social Welfare and Development', '(02) 8931-8101', '143', 'Social services and disaster assistance', 'government', false, 'active', (SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1))

ON CONFLICT (service_name) DO NOTHING;
