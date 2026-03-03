const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// ========== CORS CONFIGURATION ==========
const allowedOrigins = [
  'http://localhost:3000',
  'https://mediconnect-plum.vercel.app',  // Your Vercel frontend
  'https://mediconnect-nb0z.onrender.com'  // Your Render backend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('❌ Blocked origin:', origin);
      return callback(new Error(`CORS error: ${origin} not allowed`), false);
    }
    console.log('✅ Allowed origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== IMPORT ROUTES ==========
const authRoutes = require('./routes/authRoutes');
const healthDataRoutes = require('./routes/healthDataRoutes');

// ========== USE ROUTES ==========
app.use('/', authRoutes);
app.use('/', healthDataRoutes);

// ========== PUBLIC TEST ROUTE ==========
app.get('/test', (req, res) => {
  res.status(200).json({ 
    message: '✅ Server is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigins: allowedOrigins,
      notes: 'Add your frontend URL to allowedOrigins if not listed'
    },
    endpoints: {
      test: 'GET /test',
      root: 'GET /',
      signup: 'POST /signup',
      login: 'POST /login',
      me: 'GET /me (requires token)',
      saveHealthData: 'POST /saveHealthData (requires token)',
      getHealthData: 'GET /getHealthData (requires token)'
    }
  });
});

// ========== ROOT ROUTE ==========
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 MediConnect API',
    documentation: 'Visit /test for server status and available endpoints',
    version: '1.0.0',
    backend: 'Render',
    frontend: 'https://mediconnect-plum.vercel.app'
  });
});

// ========== 404 HANDLER ==========
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /',
      'GET /test',
      'POST /signup',
      'POST /login',
      'GET /me',
      'POST /saveHealthData',
      'GET /getHealthData'
    ]
  });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 Test at: /test`);
  console.log(`🌍 Public URL: https://mediconnect-nb0z.onrender.com`);
  console.log(`🔗 Allowed origins:`, allowedOrigins);
});