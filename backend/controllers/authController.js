const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Signup
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName
                }
            }
        });

        if (authError) throw authError;

        // Create profile in profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: authData.user.id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                }
            ]);

        if (profileError) throw profileError;

        // Generate JWT token
        const token = jwt.sign(
            { userId: authData.user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'Signup successful!',
            token,
            user: {
                id: authData.user.id,
                firstName,
                lastName,
                email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Sign in with Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) throw authError;

        // Get user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError) throw profileError;

        // Generate JWT token
        const token = jwt.sign(
            { userId: authData.user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            user: {
                id: authData.user.id,
                firstName: profile.first_name,
                lastName: profile.last_name,
                email: profile.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', req.userId)
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            user: {
                id: profile.id,
                firstName: profile.first_name,
                lastName: profile.last_name,
                email: profile.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};