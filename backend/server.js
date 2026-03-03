const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://mediconnect-frontend.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'MediConnect Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});