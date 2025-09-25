-- Create storage bucket for incident images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mdrrmo-images', 'mdrrmo-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to upload images (for incident reports)
CREATE POLICY "Allow incident image uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'mdrrmo-images'
);

-- Allow public access to view images
CREATE POLICY "Images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'mdrrmo-images');

-- Allow deletion of images (for cleanup)
CREATE POLICY "Allow image deletion" ON storage.objects
FOR DELETE USING (bucket_id = 'mdrrmo-images');
