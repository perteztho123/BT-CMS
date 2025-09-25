-- Database VACUUM Operations
-- Must be run outside of transactions
-- Created: 2025-01-27

-- Created separate script for VACUUM operations that cannot run in transactions

-- Note: This script should be run manually or via a scheduled job
-- VACUUM operations cannot be run inside transaction blocks

-- Full vacuum and analyze for all tables
VACUUM ANALYZE public.profiles;
VACUUM ANALYZE public.incident_reports;
VACUUM ANALYZE public.contact_messages;
VACUUM ANALYZE public.volunteer_applications;
VACUUM ANALYZE public.messages;
VACUUM ANALYZE public.message_replies;
VACUUM ANALYZE public.announcements;
VACUUM ANALYZE public.news_articles;
VACUUM ANALYZE public.events_activities;
VACUUM ANALYZE public.gallery_images;
VACUUM ANALYZE public.videos;
VACUUM ANALYZE public.public_documents;
VACUUM ANALYZE public.weather_updates;
VACUUM ANALYZE public.hotline_numbers;
VACUUM ANALYZE public.maps;

-- Reindex for optimal performance
REINDEX DATABASE postgres;
