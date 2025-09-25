-- Database Triggers and Functions
-- Automated updates and data integrity
-- Created: 2025-01-27

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all relevant tables
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at 
    BEFORE UPDATE ON public.incident_reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON public.contact_messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_applications_updated_at 
    BEFORE UPDATE ON public.volunteer_applications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON public.messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at 
    BEFORE UPDATE ON public.announcements 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at 
    BEFORE UPDATE ON public.news_articles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_activities_updated_at 
    BEFORE UPDATE ON public.events_activities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at 
    BEFORE UPDATE ON public.gallery_images 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at 
    BEFORE UPDATE ON public.videos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_public_documents_updated_at 
    BEFORE UPDATE ON public.public_documents 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotline_numbers_updated_at 
    BEFORE UPDATE ON public.hotline_numbers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maps_updated_at 
    BEFORE UPDATE ON public.maps 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate reference numbers for incident reports
CREATE OR REPLACE FUNCTION generate_incident_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
        NEW.reference_number := 'INC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('incident_ref_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sequence for incident reference numbers
CREATE SEQUENCE IF NOT EXISTS incident_ref_seq START 1;

-- Apply reference number trigger to incident reports
CREATE TRIGGER generate_incident_reference_trigger
    BEFORE INSERT ON public.incident_reports
    FOR EACH ROW EXECUTE FUNCTION generate_incident_reference();

-- Function to generate reference numbers for messages
CREATE OR REPLACE FUNCTION generate_message_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
        NEW.reference_number := 'MSG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('message_ref_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sequence for message reference numbers
CREATE SEQUENCE IF NOT EXISTS message_ref_seq START 1;

-- Apply reference number trigger to messages
CREATE TRIGGER generate_message_reference_trigger
    BEFORE INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION generate_message_reference();

-- Function to increment document download count
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.public_documents 
    SET download_count = download_count + 1 
    WHERE id = NEW.document_id;
    RETURN NEW;
END;
$$ language 'plpgsql';
