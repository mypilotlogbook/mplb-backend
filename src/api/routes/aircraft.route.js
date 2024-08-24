const express = require('express');
const { getAircrafts, getAircraft, deleteAircraft, createAircraft, updateAircraft, getAircraftsByUserId, deleteAircraftsByUserId } = require('../controllers/aircraft.controller');

const router = express.Router();

//get all aircraft
router.get('/', getAircrafts);

//get single aircraft
router.get('/:aircraftId', getAircraft);

//create aircraft
router.post('/', createAircraft);

//update aircraft
router.put('/:aircraftId', updateAircraft);

//delete aircraft
router.delete('/:aircraftId', deleteAircraft);

//get aircrafts by userId
router.get('/getByUserId/:userId', getAircraftsByUserId);

//delete aircrafts by userId
router.delete('/deleteAircraftsByUserId/:userId', deleteAircraftsByUserId);

module.exports = router;