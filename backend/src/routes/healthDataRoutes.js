const express = require('express');
const router = express.Router();
const {
  saveHealthData,
  getHealthData,
  getLatestHealthData,
  deleteHealthData
} = require('../controllers/healthDataController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.post('/saveHealthData', saveHealthData);
router.get('/getHealthData', getHealthData);
router.get('/getLatestHealthData', getLatestHealthData);
router.delete('/deleteHealthData/:id', deleteHealthData);

module.exports = router;