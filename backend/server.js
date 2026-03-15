const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();

// ============= MIDDLEWARE =============
app.use(cors({
    origin: ['https://mediconnect-1-b00h.onrender.com', 'http://localhost:1234'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));


// ============= DATABASE CONNECTION =============

// MongoDB Atlas Connection (Cloud Database)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment variables");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📊 Database: healthDB');
    console.log('📁 Collections: users, healthdatas, messages');
})
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
});

// ============= DATABASE SCHEMAS =============

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'],
        trim: true 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Health Data Schema
const healthDataSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    weight: { 
        type: Number,
        required: true 
    },
    bloodPressure: { 
        type: String,
        required: true 
    },
    heartRate: { 
        type: Number,
        required: true 
    },
    sleepPatterns: { 
        type: String,
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

// Message Schema (for community chat)
const messageSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

// Create Models
const User = mongoose.model('User', userSchema);
const HealthData = mongoose.model('HealthData', healthDataSchema);
const Message = mongoose.model('Message', messageSchema);

// ============= API ROUTES =============

// ===== Test Route =====
app.get('/api', (req, res) => {
    res.json({ 
        message: '🚀 MediConnect Backend is Running!', 
        database: 'MongoDB Atlas',
        status: 'active',
        timestamp: new Date().toISOString()
    });
});

// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is healthy',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// ===== USER AUTHENTICATION ROUTES =====

/**
 * @route   POST /api/signup
 * @desc    Register a new user
 * @access  Public
 */
app.post('/api/signup', async (req, res) => {
    try {
        console.log('📝 Signup request received:', req.body);
        
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ 
                success: false,
                error: 'All fields are required!' 
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ 
                success: false,
                error: 'Passwords do not match!' 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false,
                error: 'Password must be at least 6 characters!' 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: 'Email already registered!' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await user.save();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ 
            success: true,
            message: 'Registration successful!',
            user: userResponse
        });

    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error! Please try again.' 
        });
    }
});

/**
 * @route   POST /api/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
app.post('/api/login', async (req, res) => {
    try {
        console.log('🔑 Login request received:', req.body.email);
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Email and password are required!' 
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email or password' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email or password' 
            });
        }

        // Create token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                name: user.firstName 
            },
            process.env.JWT_SECRET || 'mediconnect-secret-key-2024',
            { expiresIn: '24h' }
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// ===== HEALTH DATA ROUTES =====

/**
 * @route   POST /api/saveHealthData
 * @desc    Save user health data
 * @access  Private
 */
app.post('/api/saveHealthData', async (req, res) => {
    try {
        console.log('💾 Saving health data for user:', req.body.userId);
        
        const { weight, bloodPressure, heartRate, sleepPatterns, userId } = req.body;

        // Validation
        if (!userId) {
            return res.status(400).json({ 
                success: false,
                error: 'User ID required' 
            });
        }

        if (!weight || !bloodPressure || !heartRate || !sleepPatterns) {
            return res.status(400).json({ 
                success: false,
                error: 'All fields are required' 
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        // Save health data
        const healthData = new HealthData({
            userId,
            weight: Number(weight),
            bloodPressure,
            heartRate: Number(heartRate),
            sleepPatterns
        });

        await healthData.save();

        res.json({ 
            success: true,
            message: 'Health data saved successfully',
            entry: healthData 
        });

    } catch (error) {
        console.error('❌ Save health data error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

/**
 * @route   GET /api/getHealthData
 * @desc    Get user health data
 * @access  Private
 */
app.get('/api/getHealthData', async (req, res) => {
    try {
        const { userId } = req.query;
        
        if (!userId) {
            return res.status(400).json({ 
                success: false,
                error: 'User ID required' 
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        const healthData = await HealthData.find({ userId })
            .sort({ date: -1 })
            .limit(50);

        res.json({
            success: true,
            data: healthData
        });

    } catch (error) {
        console.error('❌ Get health data error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// ===== COMMUNITY MESSAGES ROUTES =====

/**
 * @route   POST /api/messages
 * @desc    Save chat message
 * @access  Private
 */
app.post('/api/messages', async (req, res) => {
    try {
        console.log('💬 Saving message from user:', req.body.userId);
        
        const { userId, userName, text } = req.body;

        if (!userId || !userName || !text) {
            return res.status(400).json({ 
                success: false,
                error: 'All fields are required' 
            });
        }

        const message = new Message({
            userId,
            userName,
            text
        });

        await message.save();

        res.json({
            success: true,
            message: 'Message saved',
            data: message
        });

    } catch (error) {
        console.error('❌ Save message error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

/**
 * @route   GET /api/messages
 * @desc    Get chat messages
 * @access  Public
 */
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find()
            .sort({ timestamp: -1 })
            .limit(50);

        res.json({
            success: true,
            data: messages
        });

    } catch (error) {
        console.error('❌ Get messages error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// ===== USER MANAGEMENT ROUTES =====

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only - for testing)
 * @access  Public (for development)
 */
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('❌ Get users error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: 'User not found' 
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('❌ Get user error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// ===== STATISTICS ROUTE =====

/**
 * @route   GET /api/stats
 * @desc    Get platform statistics
 * @access  Public
 */
app.get('/api/stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const healthDataCount = await HealthData.countDocuments();
        const messageCount = await Message.countDocuments();

        res.json({
            success: true,
            data: {
                totalUsers: userCount,
                totalHealthEntries: healthDataCount,
                totalMessages: messageCount,
                database: 'MongoDB Atlas',
                status: 'active'
            }
        });
    } catch (error) {
        console.error('❌ Stats error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// ===== FRONTEND ROUTES =====

// Serve main.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/main.html'));
});

// Serve other HTML files
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, '../frontend', page);
    
    // If it's an HTML file request
    if (page.endsWith('.html')) {
        res.sendFile(filePath);
    }
});

// ===== ERROR HANDLING MIDDLEWARE =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 SERVER STARTED SUCCESSFULLY');
    console.log('='.repeat(50));
    console.log(`📍 Port: ${PORT}`);
    console.log(`📁 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 API Base: http://localhost:${PORT}/api`);
    console.log(`💾 Database: MongoDB Atlas (Cloud)`);
    console.log(`📊 Status: http://localhost:${PORT}/api/health`);
    console.log('='.repeat(50) + '\n');
});