-- Enable Row Level Security on existing tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Incident Reports policies
DROP POLICY IF EXISTS "Users can view their own incident reports" ON incident_reports;
CREATE POLICY "Users can view their own incident reports" ON incident_reports
  FOR SELECT USING (auth.uid()::text = reporter_name OR auth.uid()::text = email);

DROP POLICY IF EXISTS "Anyone can insert incident reports" ON incident_reports;
CREATE POLICY "Anyone can insert incident reports" ON incident_reports
  FOR INSERT WITH CHECK (true);

-- Contact Messages policies
DROP POLICY IF EXISTS "Users can view their own contact messages" ON contact_messages;
CREATE POLICY "Users can view their own contact messages" ON contact_messages
  FOR SELECT USING (auth.uid()::text = email);

DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Volunteer Applications policies
DROP POLICY IF EXISTS "Users can view their own volunteer applications" ON volunteer_applications;
CREATE POLICY "Users can view their own volunteer applications" ON volunteer_applications
  FOR SELECT USING (auth.uid()::text = email);

DROP POLICY IF EXISTS "Anyone can insert volunteer applications" ON volunteer_applications;
CREATE POLICY "Anyone can insert volunteer applications" ON volunteer_applications
  FOR INSERT WITH CHECK (true);

-- Admin policies (based on email domain)
DROP POLICY IF EXISTS "Admins can view all incident reports" ON incident_reports;
CREATE POLICY "Admins can view all incident reports" ON incident_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@mdrrmo.gov.ph'
    )
  );

DROP POLICY IF EXISTS "Admins can update incident reports" ON incident_reports;
CREATE POLICY "Admins can update incident reports" ON incident_reports
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@mdrrmo.gov.ph'
    )
  );

DROP POLICY IF EXISTS "Admins can view all contact messages" ON contact_messages;
CREATE POLICY "Admins can view all contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@mdrrmo.gov.ph'
    )
  );

DROP POLICY IF EXISTS "Admins can view all volunteer applications" ON volunteer_applications;
CREATE POLICY "Admins can view all volunteer applications" ON volunteer_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@mdrrmo.gov.ph'
    )
  );
