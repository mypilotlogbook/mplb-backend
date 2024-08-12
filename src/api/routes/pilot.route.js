const express = require('express');
const { getAllPilots, getPilot, createPilot, updatePilot, deletePilot, getAllPilotsByUserId } = require('../controllers/pilot.controller');

const router = express.Router();

//get all pilots
router.get('/', getAllPilots);

//get all pilots by userId
router.get('/getPilotByUserId/:userId', getAllPilotsByUserId);

//get single pilot
router.get('/:pilotId', getPilot);

//create pilot
router.post('/', createPilot);

//update pilot
router.put('/:pilotId', updatePilot);

//delete pilot
router.delete('/:pilotId', deletePilot);

module.exports = router;