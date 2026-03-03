// test-env.js
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

console.log('🧪 TESTING ENVIRONMENT VARIABLES');
console.log('================================');
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', path.resolve(__dirname, '.env'));

// Check if file exists
if (fs.existsSync(path.resolve(__dirname, '.env'))) {
    console.log('✅ .env file exists');
    console.log('File stats:', fs.statSync(path.resolve(__dirname, '.env')));
    
    // Read file content
    const content = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');
    console.log('\n📄 File content (first 100 chars):', content.substring(0, 100) + '...');
    console.log('File lines:', content.split('\n').length);
} else {
    console.log('❌ .env file does NOT exist at this location!');
    process.exit(1);
}

// Load environment variables
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
    console.log('❌ Error loading .env:', result.error);
} else {
    console.log('✅ dotenv loaded successfully');
}

console.log('\n================================');
console.log('Environment Variables:');
console.log('PORT:', process.env.PORT || '❌ MISSING');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ ' + process.env.SUPABASE_URL.substring(0, 30) + '...' : '❌ MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Present' : '❌ MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Present' : '❌ MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Present' : '❌ MISSING');
console.log('================================');