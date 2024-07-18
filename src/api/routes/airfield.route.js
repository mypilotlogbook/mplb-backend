const express = require('express');
const { getAirfields, getAirfield, deleteAirfield, createAirfield, updateAirfield } = require('../controllers/airfield.controller');

const router = express.Router();

//get all airfield
router.get('/', getAirfields);

//get single airfield
router.get('/:airfieldId', getAirfield);

//create airfield
router.post('/', createAirfield);

//update airfield
router.patch('/:airfieldId', updateAirfield);

//delete airfield
router.delete('/:airfieldId', deleteAirfield);

module.exports = router;