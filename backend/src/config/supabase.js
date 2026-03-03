// backend/src/config/supabase.js
const { createClient } = require('@supabase/supabase-js');

// Load environment variables at the VERY TOP
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

console.log('🔧 Config File Loaded');
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', require('path').resolve(__dirname, '../../.env'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('SUPABASE_URL exists:', !!supabaseUrl);
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseKey);

if (!supabaseUrl) {
  console.error('❌ ERROR: SUPABASE_URL is missing!');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('❌ ERROR: SUPABASE_SERVICE_ROLE_KEY is missing!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client initialized successfully');

module.exports = supabase;