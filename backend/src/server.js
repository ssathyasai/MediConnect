require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const healthDataRoutes = require('./routes/healthDataRoutes');

const app = express();

// Update CORS to allow your frontend domains
const allowedOrigins = [
  'http://localhost:3000',
  'https://mediconnect-frontend.onrender.com',  // Your frontend URL (update after deploying)
  'https://mediconnect-nb0z.onrender.com'       // Your new backend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/', healthDataRoutes);

// Test route (public)
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is running',
    env: {
      port: process.env.PORT,
      supabaseConfigured: !!process.env.SUPABASE_URL
    }
  });
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 Test at: /test`);
});