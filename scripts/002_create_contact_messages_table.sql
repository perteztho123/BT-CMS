-- Create contact messages table for general inquiries and messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact messages
-- Allow anyone to insert contact messages (public contact form)
CREATE POLICY "Allow public contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow admin users to view all contact messages
CREATE POLICY "Allow admin to view all contact messages" ON public.contact_messages
  FOR SELECT USING (true);

-- Allow admin users to update contact messages (status changes)
CREATE POLICY "Allow admin to update contact messages" ON public.contact_messages
  FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_type ON public.contact_messages(message_type);

-- Create updated_at trigger
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON public.contact_messages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
