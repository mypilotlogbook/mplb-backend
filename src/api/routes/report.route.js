const express = require('express');
const { generateAllAirfieldsPdf, generateSelectedAirfieldsPdf } = require('../controllers/report.controller');

const router = express.Router();

//generate pdf
router.post('/generateAllAirfieldsPdf', generateAllAirfieldsPdf);
router.post('/generateSelectedAirfieldsPdf', generateSelectedAirfieldsPdf);

module.exports = router;