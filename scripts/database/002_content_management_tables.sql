-- Content Management Tables
-- News, Announcements, Events, Gallery, Documents
-- Created: 2025-01-27

-- Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('emergency', 'general', 'event', 'maintenance', 'weather')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status CHARACTER VARYING DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published BOOLEAN DEFAULT FALSE,
    featured_image TEXT,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS public.news_articles (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category CHARACTER VARYING NOT NULL CHECK (category IN ('breaking', 'community', 'government', 'health', 'safety', 'environment')),
    status CHARACTER VARYING DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    image_url TEXT,
    video_url TEXT,
    media_type CHARACTER VARYING DEFAULT 'text' CHECK (media_type IN ('text', 'image', 'video', 'mixed')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events and Activities Table
CREATE TABLE IF NOT EXISTS public.events_activities (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    description TEXT NOT NULL,
    category CHARACTER VARYING NOT NULL CHECK (category IN ('training', 'community', 'emergency_drill', 'meeting', 'workshop', 'social')),
    event_date DATE NOT NULL,
    event_time TIME WITHOUT TIME ZONE,
    location CHARACTER VARYING NOT NULL,
    organizer CHARACTER VARYING NOT NULL,
    max_participants INTEGER,
    registration_required BOOLEAN DEFAULT FALSE,
    status CHARACTER VARYING DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    image_url TEXT,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text CHARACTER VARYING,
    category CHARACTER VARYING NOT NULL CHECK (category IN ('events', 'activities', 'facilities', 'team', 'community', 'emergency_response')),
    tags TEXT[] DEFAULT '{}',
    status CHARACTER VARYING DEFAULT 'active' CHECK (status IN ('active', 'archived', 'hidden')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS public.videos (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration INTEGER, -- in seconds
    category CHARACTER VARYING NOT NULL CHECK (category IN ('training', 'awareness', 'events', 'testimonials', 'tutorials')),
    tags TEXT[] DEFAULT '{}',
    status CHARACTER VARYING DEFAULT 'active' CHECK (status IN ('active', 'archived', 'hidden')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public Documents Table
CREATE TABLE IF NOT EXISTS public.public_documents (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type CHARACTER VARYING NOT NULL CHECK (file_type IN ('pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt')),
    file_size INTEGER, -- in bytes
    category CHARACTER VARYING NOT NULL CHECK (category IN ('forms', 'guidelines', 'reports', 'policies', 'procedures', 'maps')),
    download_count INTEGER DEFAULT 0,
    status CHARACTER VARYING DEFAULT 'active' CHECK (status IN ('active', 'archived', 'hidden')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for content management tables
CREATE INDEX IF NOT EXISTS idx_announcements_category ON public.announcements(category);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON public.announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(published);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_status ON public.news_articles(status);
CREATE INDEX IF NOT EXISTS idx_events_activities_date ON public.events_activities(event_date);
CREATE INDEX IF NOT EXISTS idx_events_activities_category ON public.events_activities(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON public.gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_videos_category ON public.videos(category);
CREATE INDEX IF NOT EXISTS idx_public_documents_category ON public.public_documents(category);
