const express = require('express');
const { generateAirfieldsPdf } = require('../controllers/report.controller');

const router = express.Router();

//generate pdf
router.post('/generateAirfieldsPdf', generateAirfieldsPdf);

module.exports = router;