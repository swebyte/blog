-- Migration #001: Add user foreign key to blog and experience tables

-- Add user_id column to blog table
ALTER TABLE api.blog 
ADD COLUMN IF NOT EXISTS user_id bigint;

-- Add foreign key constraint
ALTER TABLE api.blog
ADD CONSTRAINT fk_blog_user 
FOREIGN KEY (user_id) REFERENCES api.users(id) ON DELETE SET NULL;

-- Add user_id column to experience table
ALTER TABLE api.experience 
ADD COLUMN IF NOT EXISTS user_id bigint;

-- Add foreign key constraint
ALTER TABLE api.experience
ADD CONSTRAINT fk_experience_user 
FOREIGN KEY (user_id) REFERENCES api.users(id) ON DELETE SET NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_user_id ON api.blog(user_id);
CREATE INDEX IF NOT EXISTS idx_experience_user_id ON api.experience(user_id);
