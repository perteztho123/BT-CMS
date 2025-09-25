-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteer_applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    skills TEXT[] NOT NULL,
    availability VARCHAR(100) NOT NULL,
    motivation TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_created_at ON volunteer_applications(created_at);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_messages
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contact_messages" ON contact_messages
    FOR SELECT TO authenticated USING (true);

-- Create policies for volunteer_applications
CREATE POLICY "Allow public insert on volunteer_applications" ON volunteer_applications
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view volunteer_applications" ON volunteer_applications
    FOR SELECT TO authenticated USING (true);
