-- Utility Tables
-- Weather, Maps, Hotlines, and other supporting data
-- Created: 2025-01-27

-- Weather Updates Table
CREATE TABLE IF NOT EXISTS public.weather_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    weather_condition TEXT NOT NULL,
    temperature NUMERIC(5,2), -- in Celsius
    humidity INTEGER CHECK (humidity >= 0 AND humidity <= 100), -- percentage
    pressure NUMERIC(7,2), -- in hPa
    wind_speed NUMERIC(5,2), -- in km/h
    wind_direction TEXT,
    visibility NUMERIC(5,2), -- in km
    alert_level TEXT CHECK (alert_level IN ('none', 'yellow', 'orange', 'red')),
    forecast_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotline Numbers Table
CREATE TABLE IF NOT EXISTS public.hotline_numbers (
    id SERIAL PRIMARY KEY,
    service_name CHARACTER VARYING NOT NULL,
    primary_number CHARACTER VARYING NOT NULL,
    secondary_number CHARACTER VARYING,
    description TEXT,
    category CHARACTER VARYING NOT NULL CHECK (category IN ('emergency', 'medical', 'fire', 'police', 'rescue', 'utility', 'government')),
    is_24_7 BOOLEAN DEFAULT TRUE,
    status CHARACTER VARYING DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maps Table
CREATE TABLE IF NOT EXISTS public.maps (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING NOT NULL,
    description TEXT,
    map_type CHARACTER VARYING NOT NULL CHECK (map_type IN ('evacuation', 'hazard', 'facility', 'barangay', 'emergency_route')),
    barangay CHARACTER VARYING,
    image_url TEXT,
    interactive_url TEXT,
    map_data JSONB DEFAULT '{}', -- For storing GeoJSON or other map data
    status CHARACTER VARYING DEFAULT 'active' CHECK (status IN ('active', 'archived', 'maintenance')),
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for utility tables
CREATE INDEX IF NOT EXISTS idx_weather_updates_created_at ON public.weather_updates(created_at);
CREATE INDEX IF NOT EXISTS idx_weather_updates_alert_level ON public.weather_updates(alert_level);
CREATE INDEX IF NOT EXISTS idx_hotline_numbers_category ON public.hotline_numbers(category);
CREATE INDEX IF NOT EXISTS idx_hotline_numbers_status ON public.hotline_numbers(status);
CREATE INDEX IF NOT EXISTS idx_maps_type ON public.maps(map_type);
CREATE INDEX IF NOT EXISTS idx_maps_barangay ON public.maps(barangay);
