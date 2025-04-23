// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');


const app = express();
const PORT = 1234;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MongoDB connection
const mongodb_uri = "mongodb+srv://username:password@cluster0.cikhuki.mongodb.net/healthDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongodb_uri)
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

// Signup Route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, conf } = req.body;
    try {
      const newUser = new User({ firstName, lastName, email, password });
      await newUser.save();
      res.status(200).send('Signup successful!');
    } catch (err) {
      res.status(400).send('Error signing up: ' + err.message);
    }
  });
  
  
  // Login Route
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
      if (user) {
        res.status(200).send('Login successful!');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
