// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = 1234;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongodb_uri = "mongodb+srv://harinivas_28:mongo_harinvas@cluster0.cikhuki.mongodb.net/healthDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));

// Schema and model
const healthSchema = new mongoose.Schema({
    weight: Number,
    bloodPressure: String,
    heartRate: Number,
    sleepPatterns: String,
    createdAt: { type: Date, default: Date.now }
});

const HealthData = mongoose.model('HealthData', healthSchema);

// Route
app.post('/saveHealthData', async (req, res) => {
    try {
        const healthEntry = new HealthData(req.body);
        await healthEntry.save();
        res.json({ message: "Health data saved successfully" });
    } catch (error) {
        console.error("Error saving health data:", error);
        res.status(500).json({ message: "Error saving health data", error });
    }
});

app.get('/', (req, res) => {
    res.send('MediConnect backend is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
