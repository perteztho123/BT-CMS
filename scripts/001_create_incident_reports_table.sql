-- Create incident reports table for emergency incident submissions
CREATE TABLE IF NOT EXISTS public.incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  barangay TEXT,
  specific_location TEXT,
  incident_type TEXT NOT NULL,
  incident_description TEXT NOT NULL,
  urgency_level TEXT NOT NULL DEFAULT 'HIGH',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for incident reports
-- Allow anyone to insert incident reports (public reporting)
CREATE POLICY "Allow public incident reporting" ON public.incident_reports
  FOR INSERT WITH CHECK (true);

-- Allow admin users to view all incident reports (for admin dashboard)
CREATE POLICY "Allow admin to view all incident reports" ON public.incident_reports
  FOR SELECT USING (true);

-- Allow admin users to update incident reports (status changes)
CREATE POLICY "Allow admin to update incident reports" ON public.incident_reports
  FOR UPDATE USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_incident_reports_created_at ON public.incident_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_incident_reports_status ON public.incident_reports(status);
CREATE INDEX IF NOT EXISTS idx_incident_reports_urgency ON public.incident_reports(urgency_level);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_incident_reports_updated_at 
  BEFORE UPDATE ON public.incident_reports 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
