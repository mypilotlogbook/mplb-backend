const express = require('express');
const { getMonthlyFlightData, getMonthlyPilotsData, getMonthlyAicraftData } = require('../controllers/analytics.controller');

const router = express.Router();

//get monthly analytics
router.get('/getMonthlyFlightData/:userId', getMonthlyFlightData);
router.get('/getMonthlyPilotsData/:userId', getMonthlyPilotsData);
router.get('/getMonthlyAicraftData/:userId', getMonthlyAicraftData);

module.exports = router;