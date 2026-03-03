const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    saveHealthData,
    getHealthData,
    getLatestHealthData
} = require('../controllers/healthController');

const router = express.Router();

router.use(authenticateToken); // All routes require authentication

router.post('/save', saveHealthData);
router.get('/all', getHealthData);
router.get('/latest', getLatestHealthData);

module.exports = router;