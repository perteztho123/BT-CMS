-- Database Backup and Recovery Script
-- Instructions for backing up the emergency response system database
-- Created: 2025-01-27

-- This file contains instructions for database backup and recovery
-- Execute these commands using pg_dump and psql tools

/*
=== FULL DATABASE BACKUP ===
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -f emergency_response_backup_$(date +%Y%m%d_%H%M%S).sql

=== TABLE-SPECIFIC BACKUPS ===
-- Core emergency data
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.incident_reports -f incident_reports_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.contact_messages -f contact_messages_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.volunteer_applications -f volunteer_applications_backup.sql

-- Content management data
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.announcements -f announcements_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.news_articles -f news_articles_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.events_activities -f events_backup.sql

-- Media and documents
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.gallery_images -f gallery_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.videos -f videos_backup.sql
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -t public.public_documents -f documents_backup.sql

=== SCHEMA ONLY BACKUP ===
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] --schema-only -f schema_backup.sql

=== DATA ONLY BACKUP ===
pg_dump -h [HOST] -U [USERNAME] -d [DATABASE_NAME] --data-only -f data_backup.sql

=== RESTORE DATABASE ===
psql -h [HOST] -U [USERNAME] -d [DATABASE_NAME] -f emergency_response_backup.sql

=== AUTOMATED BACKUP SCRIPT (Linux/Mac) ===
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="your_database_name"
DB_HOST="your_host"
DB_USER="your_username"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Full backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -f $BACKUP_DIR/full_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/full_backup_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: full_backup_$DATE.sql.gz"
*/

-- Recovery verification queries
-- Run these after restore to verify data integrity

SELECT 'incident_reports' as table_name, COUNT(*) as record_count FROM public.incident_reports
UNION ALL
SELECT 'contact_messages', COUNT(*) FROM public.contact_messages
UNION ALL
SELECT 'volunteer_applications', COUNT(*) FROM public.volunteer_applications
UNION ALL
SELECT 'announcements', COUNT(*) FROM public.announcements
UNION ALL
SELECT 'news_articles', COUNT(*) FROM public.news_articles
UNION ALL
SELECT 'events_activities', COUNT(*) FROM public.events_activities
UNION ALL
SELECT 'gallery_images', COUNT(*) FROM public.gallery_images
UNION ALL
SELECT 'videos', COUNT(*) FROM public.videos
UNION ALL
SELECT 'public_documents', COUNT(*) FROM public.public_documents
UNION ALL
SELECT 'hotline_numbers', COUNT(*) FROM public.hotline_numbers
UNION ALL
SELECT 'maps', COUNT(*) FROM public.maps
UNION ALL
SELECT 'weather_updates', COUNT(*) FROM public.weather_updates;

-- Check for any missing foreign key relationships
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_schema = 'public';
