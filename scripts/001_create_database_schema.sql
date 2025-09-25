-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for contact messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  reference_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create incident_reports table for emergency reports
CREATE TABLE IF NOT EXISTS public.incident_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT,
  incident_type TEXT NOT NULL,
  incident_location TEXT NOT NULL,
  landmark TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  incident_description TEXT NOT NULL,
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high')),
  incident_photos JSONB DEFAULT '[]',
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'responding', 'resolved')),
  reference_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create message_replies table for admin responses
CREATE TABLE IF NOT EXISTS public.message_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id),
  reply_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create announcements table for news and updates
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'emergency', 'weather', 'event')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  published BOOLEAN DEFAULT FALSE,
  featured_image TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weather_updates table
CREATE TABLE IF NOT EXISTS public.weather_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  temperature DECIMAL(5, 2),
  humidity INTEGER,
  weather_condition TEXT,
  wind_speed DECIMAL(5, 2),
  wind_direction TEXT,
  pressure DECIMAL(7, 2),
  visibility DECIMAL(5, 2),
  forecast_data JSONB,
  alert_level TEXT DEFAULT 'normal' CHECK (alert_level IN ('normal', 'advisory', 'watch', 'warning')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_updates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for messages
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for incident reports (public can insert, only admins can view all)
CREATE POLICY "Anyone can submit incident reports" ON public.incident_reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own incident reports by contact info" ON public.incident_reports
  FOR SELECT USING (
    contact_number = (SELECT phone FROM public.profiles WHERE id = auth.uid()) OR
    email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );

-- Create RLS policies for message replies
CREATE POLICY "Users can view replies to their messages" ON public.message_replies
  FOR SELECT USING (
    message_id IN (SELECT id FROM public.messages WHERE user_id = auth.uid())
  );

-- Create RLS policies for announcements (public read)
CREATE POLICY "Anyone can view published announcements" ON public.announcements
  FOR SELECT USING (published = true);

-- Create RLS policies for weather updates (public read)
CREATE POLICY "Anyone can view weather updates" ON public.weather_updates
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_status ON public.messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_incident_reports_status ON public.incident_reports(status);
CREATE INDEX IF NOT EXISTS idx_incident_reports_urgency ON public.incident_reports(urgency_level);
CREATE INDEX IF NOT EXISTS idx_incident_reports_created_at ON public.incident_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(published);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON public.announcements(category);
CREATE INDEX IF NOT EXISTS idx_weather_updates_created_at ON public.weather_updates(created_at DESC);

-- Create functions for generating reference numbers
CREATE OR REPLACE FUNCTION generate_message_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'MSG-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('message_ref_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_incident_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('incident_ref_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequences for reference numbers
CREATE SEQUENCE IF NOT EXISTS message_ref_seq START 1;
CREATE SEQUENCE IF NOT EXISTS incident_ref_seq START 1;

-- Create triggers to auto-generate reference numbers
CREATE OR REPLACE FUNCTION set_message_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_number IS NULL THEN
    NEW.reference_number := generate_message_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_incident_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_number IS NULL THEN
    NEW.reference_number := generate_incident_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_set_message_reference ON public.messages;
CREATE TRIGGER trigger_set_message_reference
  BEFORE INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION set_message_reference();

DROP TRIGGER IF EXISTS trigger_set_incident_reference ON public.incident_reports;
CREATE TRIGGER trigger_set_incident_reference
  BEFORE INSERT ON public.incident_reports
  FOR EACH ROW EXECUTE FUNCTION set_incident_reference();

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at BEFORE UPDATE ON public.incident_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
