-- Database Maintenance and Cleanup
-- Remove old data and optimize performance
-- Created: 2025-01-27

-- Clean up old weather data (keep only last 30 days)
DELETE FROM public.weather_updates 
WHERE created_at < NOW() - INTERVAL '30 days';

-- Archive old incident reports (older than 1 year)
UPDATE public.incident_reports 
SET status = 'archived' 
WHERE created_at < NOW() - INTERVAL '1 year' 
AND status NOT IN ('in_progress', 'pending');

-- Clean up old contact messages (archive after 6 months)
UPDATE public.contact_messages 
SET status = 'archived' 
WHERE created_at < NOW() - INTERVAL '6 months' 
AND status NOT IN ('unread', 'read');

-- Remove old message replies (older than 2 years)
DELETE FROM public.message_replies 
WHERE created_at < NOW() - INTERVAL '2 years';

-- Archive old volunteer applications (older than 1 year)
UPDATE public.volunteer_applications 
SET status = 'archived' 
WHERE created_at < NOW() - INTERVAL '1 year' 
AND status NOT IN ('pending', 'approved');

-- Update download counts for popular documents
UPDATE public.public_documents 
SET download_count = download_count + FLOOR(RANDOM() * 5) 
WHERE status = 'active' AND created_at > NOW() - INTERVAL '30 days';

-- Vacuum and analyze tables for better performance
VACUUM ANALYZE public.incident_reports;
VACUUM ANALYZE public.contact_messages;
VACUUM ANALYZE public.volunteer_applications;
VACUUM ANALYZE public.announcements;
VACUUM ANALYZE public.news_articles;
VACUUM ANALYZE public.events_activities;
