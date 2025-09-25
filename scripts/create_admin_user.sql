-- This script creates the default admin user
-- Note: In production, you should create users through the Supabase dashboard or auth API

-- Insert admin user data into profiles table
-- The auth.users entry should be created through Supabase Auth
INSERT INTO profiles (id, full_name, email, phone, created_at, updated_at)
VALUES (
  -- This UUID should match the auth.users.id for the admin user
  -- You'll need to replace this with the actual UUID after creating the user
  '00000000-0000-0000-0000-000000000000',
  'MDRRMO Administrator',
  'admin@mdrrmo.gov.ph',
  '+63-968-599-6024',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  updated_at = NOW();

-- Create a function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
