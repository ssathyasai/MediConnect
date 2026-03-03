const express = require('express');
const { body } = require('express-validator');
const { signup, login, getCurrentUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim()
], signup);

router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], login);

router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;