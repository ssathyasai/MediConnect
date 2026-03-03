const HealthData = require('../models/HealthData');

exports.saveHealthData = async (req, res) => {
  try {
    const { weight, bloodPressure, heartRate, sleepPatterns } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (!weight || !bloodPressure || !heartRate || !sleepPatterns) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const data = await HealthData.create({
      userId,
      weight: parseFloat(weight),
      bloodPressure,
      heartRate: parseInt(heartRate),
      sleepPatterns
    });
    
    res.status(201).json({
      message: 'Health data saved successfully',
      entry: data
    });
  } catch (error) {
    console.error('Save health data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHealthData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await HealthData.findByUserId(userId);
    
    res.json(data);
  } catch (error) {
    console.error('Get health data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLatestHealthData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await HealthData.getLatestByUserId(userId);
    
    res.json(data || {});
  } catch (error) {
    console.error('Get latest health data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteHealthData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await HealthData.deleteById(id, userId);
    
    res.json({ message: 'Health data deleted successfully' });
  } catch (error) {
    console.error('Delete health data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};