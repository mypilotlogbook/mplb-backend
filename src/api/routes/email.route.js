const express = require('express');
const { forgotPassword, register, contact, subscribe } = require('../controllers/email.controller');

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/contact', contact);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);

module.exports = router;