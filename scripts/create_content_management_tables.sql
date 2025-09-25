-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('emergency', 'event', 'notice', 'update')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    content TEXT NOT NULL,
    image_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('training', 'event', 'update', 'emergency')),
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    media_type VARCHAR(20) CHECK (media_type IN ('image', 'video')),
    image_url TEXT,
    video_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create events_activities table
CREATE TABLE IF NOT EXISTS events_activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('training', 'drill', 'meeting', 'community', 'emergency')),
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    organizer VARCHAR(255),
    max_participants INTEGER,
    registration_required BOOLEAN DEFAULT false,
    image_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create public_documents table
CREATE TABLE IF NOT EXISTS public_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('policy', 'procedure', 'form', 'report', 'manual', 'ordinance')),
    description TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    file_size INTEGER,
    download_count INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('training', 'event', 'emergency', 'community', 'facility')),
    tags TEXT[], -- Array of tags
    alt_text VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('training', 'educational', 'emergency', 'community', 'awareness')),
    duration INTEGER, -- Duration in seconds
    tags TEXT[], -- Array of tags
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create maps table
CREATE TABLE IF NOT EXISTS maps (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    map_type VARCHAR(50) NOT NULL CHECK (map_type IN ('hazard', 'evacuation', 'facility', 'boundary', 'risk')),
    map_data JSONB, -- Store map coordinates, markers, etc.
    image_url TEXT, -- Static map image
    interactive_url TEXT, -- Link to interactive map
    barangay VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create hotline_numbers table
CREATE TABLE IF NOT EXISTS hotline_numbers (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    primary_number VARCHAR(50) NOT NULL,
    secondary_number VARCHAR(50),
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('emergency', 'medical', 'fire', 'police', 'utility', 'government')),
    is_24_7 BOOLEAN DEFAULT true,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON announcements(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_articles_status ON news_articles(status);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON news_articles(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_activities_status ON events_activities(status);
CREATE INDEX IF NOT EXISTS idx_events_activities_event_date ON events_activities(event_date);

CREATE INDEX IF NOT EXISTS idx_public_documents_status ON public_documents(status);
CREATE INDEX IF NOT EXISTS idx_public_documents_category ON public_documents(category);

CREATE INDEX IF NOT EXISTS idx_gallery_images_status ON gallery_images(status);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);

CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

CREATE INDEX IF NOT EXISTS idx_maps_status ON maps(status);
CREATE INDEX IF NOT EXISTS idx_maps_map_type ON maps(map_type);

CREATE INDEX IF NOT EXISTS idx_hotline_numbers_status ON hotline_numbers(status);
CREATE INDEX IF NOT EXISTS idx_hotline_numbers_category ON hotline_numbers(category);

-- Enable Row Level Security (RLS)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotline_numbers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for announcements
CREATE POLICY "Public can view published announcements" ON announcements
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all announcements" ON announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for news_articles
CREATE POLICY "Public can view published news articles" ON news_articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all news articles" ON news_articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for events_activities
CREATE POLICY "Public can view published events" ON events_activities
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all events" ON events_activities
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for public_documents
CREATE POLICY "Public can view published documents" ON public_documents
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all documents" ON public_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for gallery_images
CREATE POLICY "Public can view published gallery images" ON gallery_images
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all gallery images" ON gallery_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for videos
CREATE POLICY "Public can view published videos" ON videos
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all videos" ON videos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for maps
CREATE POLICY "Public can view published maps" ON maps
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all maps" ON maps
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create RLS policies for hotline_numbers
CREATE POLICY "Public can view active hotline numbers" ON hotline_numbers
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage all hotline numbers" ON hotline_numbers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.email LIKE '%@mdrrmo.gov.ph'
        )
    );

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_activities_updated_at BEFORE UPDATE ON events_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_public_documents_updated_at BEFORE UPDATE ON public_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maps_updated_at BEFORE UPDATE ON maps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotline_numbers_updated_at BEFORE UPDATE ON hotline_numbers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
