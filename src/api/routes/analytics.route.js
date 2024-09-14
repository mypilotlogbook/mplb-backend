const express = require('express');
const { getMonthlyFlightData } = require('../controllers/analytics.controller');

const router = express.Router();

//generate airfields pdf
router.get('/getMonthlyFlightData/:userId', getMonthlyFlightData);

module.exports = router;