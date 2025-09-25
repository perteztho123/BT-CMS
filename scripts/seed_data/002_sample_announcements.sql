-- Sample Announcements
-- Initial content for the emergency response system
-- Created: 2025-01-27

INSERT INTO public.announcements (title, content, category, priority, status, published, created_by) VALUES
('Emergency Preparedness Training Schedule', 
'All residents are invited to participate in our monthly emergency preparedness training. Topics include basic first aid, evacuation procedures, and disaster response protocols. Training sessions are held every first Saturday of the month at the Barangay Hall from 9:00 AM to 12:00 PM. Please bring a valid ID and wear comfortable clothing.', 
'event', 'medium', 'published', true, 
(SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

('Flood Warning Alert - Rainy Season Preparation', 
'With the approaching rainy season, residents in flood-prone areas are advised to prepare emergency kits and identify evacuation routes. Monitor weather updates regularly and report any drainage issues to the Barangay office immediately. Emergency evacuation centers are located at the Elementary School and Community Center.', 
'emergency', 'high', 'published', true, 
(SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

('New Emergency Hotline Numbers', 
'We have updated our emergency contact directory. Please save these important numbers: Barangay Emergency Response - 8XXX-XXXX, Medical Emergency - 143, Fire Emergency - 116. These numbers are available 24/7 for immediate assistance.', 
'emergency', 'high', 'published', true, 
(SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

('Community Volunteer Program Registration Open', 
'Join our Community Emergency Response Team! We are looking for dedicated volunteers to help during emergencies and community events. Training will be provided. Requirements: 18+ years old, physically fit, and willing to undergo basic emergency response training. Apply through our volunteer application form.', 
'general', 'medium', 'published', true, 
(SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1)),

('Scheduled Maintenance - Emergency Communication System', 
'Our emergency communication system will undergo scheduled maintenance on Saturday, 8:00 PM to Sunday, 6:00 AM. During this period, please use alternative contact methods. For urgent emergencies, contact the National Emergency Hotline 911 or visit the Barangay Hall directly.', 
'maintenance', 'medium', 'published', true, 
(SELECT id FROM public.profiles WHERE email LIKE '%@admin.%' LIMIT 1))

ON CONFLICT DO NOTHING;
