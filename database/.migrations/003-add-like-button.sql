ALTER TABLE api.blog 
ADD COLUMN IF NOT EXISTS likes bigint DEFAULT 0;
GRANT UPDATE (likes) ON api.blog TO anon