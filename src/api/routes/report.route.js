const express = require('express');
const { generateAllAirfieldsPdf, generateSelectedAirfieldsPdf, generateAllPilotsPdf, generateSelectedPilotsPdf, generateAllAircraftsPdf, generateSelectedAircraftsPdf, generateAllFlightsPdf, generateSelectedFlightsPdf } = require('../controllers/report.controller');

const router = express.Router();

//generate airfields pdf
router.post('/generateAllAirfieldsPdf', generateAllAirfieldsPdf);
router.post('/generateSelectedAirfieldsPdf', generateSelectedAirfieldsPdf);

//generate pilots pdf
router.post('/generateAllPilotsPdf', generateAllPilotsPdf);
router.post('/generateSelectedPilotsPdf', generateSelectedPilotsPdf);

//generate aircrafts pdf
router.post('/generateAllAircraftsPdf', generateAllAircraftsPdf);
router.post('/generateSelectedAircraftsPdf', generateSelectedAircraftsPdf);

//generate flights pdf
router.post('/generateAllFlightsPdf', generateAllFlightsPdf);
router.post('/generateSelectedFlightsPdf', generateSelectedFlightsPdf);

module.exports = router;