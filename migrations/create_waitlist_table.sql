-- Create waitlist_rnd_agent table if it doesn't exist
CREATE TABLE IF NOT EXISTS waitlist_rnd_agent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_rnd_agent_email_idx ON waitlist_rnd_agent (email);

-- Add comment to table
COMMENT ON TABLE waitlist_rnd_agent IS 'Table for storing waitlist sign-ups for the R&D Agent';