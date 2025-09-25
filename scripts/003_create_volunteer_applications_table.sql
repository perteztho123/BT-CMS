-- Create volunteer applications table for community volunteers
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  barangay TEXT NOT NULL,
  age INTEGER NOT NULL,
  occupation TEXT,
  skills TEXT,
  availability TEXT,
  experience TEXT,
  motivation TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteer applications
-- Allow anyone to insert volunteer applications (public volunteer form)
CREATE POLICY "Allow public volunteer applications" ON public.volunteer_applications
  FOR INSERT WITH CHECK (true);

-- Allow admin users to view all volunteer applications
CREATE POLICY "Allow admin to view all volunteer applications" ON public.volunteer_applications
  FOR SELECT USING (true);

-- Allow admin users to update volunteer applications (status changes)
CREATE POLICY "Allow admin to update volunteer applications" ON public.volunteer_applications
  FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created_at ON public.volunteer_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON public.volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_barangay ON public.volunteer_applications(barangay);

-- Create updated_at trigger
CREATE TRIGGER update_volunteer_applications_updated_at 
  BEFORE UPDATE ON public.volunteer_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
