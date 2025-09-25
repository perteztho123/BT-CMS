-- Row Level Security (RLS) Policies
-- Secure access control for all tables
-- Created: 2025-01-27

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotline_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maps ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Incident Reports policies (public can create, admins can manage)
CREATE POLICY "Anyone can create incident reports" ON public.incident_reports
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view incident reports" ON public.incident_reports
    FOR SELECT USING (true);

CREATE POLICY "Admins can update incident reports" ON public.incident_reports
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Contact Messages policies
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Admins can update contact messages" ON public.contact_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Message Replies policies
CREATE POLICY "Admins can create message replies" ON public.message_replies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Admins can view message replies" ON public.message_replies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Volunteer Applications policies
CREATE POLICY "Anyone can create volunteer applications" ON public.volunteer_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view volunteer applications" ON public.volunteer_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Admins can update volunteer applications" ON public.volunteer_applications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Content Management policies (public read, admin write)
CREATE POLICY "Anyone can view published announcements" ON public.announcements
    FOR SELECT USING (published = true AND status = 'published');

CREATE POLICY "Admins can manage announcements" ON public.announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Anyone can view published news articles" ON public.news_articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage news articles" ON public.news_articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Anyone can view active events" ON public.events_activities
    FOR SELECT USING (status IN ('upcoming', 'ongoing'));

CREATE POLICY "Admins can manage events" ON public.events_activities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Gallery and Media policies
CREATE POLICY "Anyone can view active gallery images" ON public.gallery_images
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage gallery images" ON public.gallery_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Anyone can view active videos" ON public.videos
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage videos" ON public.videos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Public Documents policies
CREATE POLICY "Anyone can view active documents" ON public.public_documents
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage documents" ON public.public_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

-- Utility tables policies
CREATE POLICY "Anyone can view weather updates" ON public.weather_updates
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage weather updates" ON public.weather_updates
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Anyone can view active hotline numbers" ON public.hotline_numbers
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage hotline numbers" ON public.hotline_numbers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );

CREATE POLICY "Anyone can view active maps" ON public.maps
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage maps" ON public.maps
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND email LIKE '%@admin.%'
        )
    );
