const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const supabase = require('./supabase/client');

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware
app.use(cors({
    origin: ['http://localhost:1234', 'https://your-frontend.onrender.com'],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MediConnect Backend is running!' });
});

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: hashedPassword
                }
            ])
            .select('id, email, first_name, last_name')
            .single();

        if (error) throw error;

        res.status(201).json({
            message: 'Signup successful!',
            user: { 
                id: newUser.id, 
                email: newUser.email,
                firstName: newUser.first_name,
                lastName: newUser.last_name
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Get user
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({
            message: 'Login successful!',
            user: { 
                id: user.id, 
                email: user.email, 
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Save Health Data
app.post('/api/health-data', async (req, res) => {
    try {
        const { userId, weight, bloodPressure, heartRate, sleepPatterns, date } = req.body;

        // Validate input
        if (!userId || !weight || !bloodPressure || !heartRate || !sleepPatterns) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const { data, error } = await supabase
            .from('health_data')
            .insert([
                {
                    user_id: userId,
                    weight: parseFloat(weight),
                    blood_pressure: bloodPressure,
                    heart_rate: parseInt(heartRate),
                    sleep_patterns: sleepPatterns,
                    date: date
                }
            ])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            message: 'Health data saved successfully',
            entry: data
        });
    } catch (error) {
        console.error('Error saving health data:', error);
        res.status(500).json({ error: 'Error saving health data' });
    }
});

// Get Health Data for a user
app.get('/api/health-data/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const { data, error } = await supabase
            .from('health_data')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching health data:', error);
        res.status(500).json({ error: 'Error fetching health data' });
    }
});

// Serve frontend pages
app.get('/components/:page', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/components', req.params.page));
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});