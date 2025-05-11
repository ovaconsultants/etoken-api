const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_API_URL,  // Your Supabase API URL
  process.env.SUPABASE_API_KEY  // Use service key for server-side upload
);

module.exports = supabase;
