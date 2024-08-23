const express = require('express');
const { getAllFlights, getAllFlightsByUserId, getFlight, createFlight, updateFlight, deleteFlight } = require('../controllers/flight.controller');

const router = express.Router();

//get all flight
router.get('/', getAllFlights);

//get all flight by userId
router.get('/getFlightByUserId/:userId', getAllFlightsByUserId);

//get single flight
router.get('/:flightId', getFlight);

//create flight
router.post('/', createFlight);

//update flight
router.put('/:flightId', updateFlight);

//delete flight
router.delete('/:flightId', deleteFlight);

module.exports = router;