// backend/src/server.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const healthDataRoutes = require('./routes/healthDataRoutes');

console.log('🚀 Server starting...');
console.log('PORT:', process.env.PORT);
console.log('SUPABASE_URL configured:', !!process.env.SUPABASE_URL);

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/', healthDataRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is running',
    env: {
      port: process.env.PORT,
      supabaseConfigured: !!process.env.SUPABASE_URL
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 Test at: http://localhost:${PORT}/test`);
});