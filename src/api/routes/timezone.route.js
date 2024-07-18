const express = require('express');
const { getAllTimezones, getTimezone, createTimezone, updateTimezone, deleteTimezone } = require('../controllers/timezone.controller');

const router = express.Router();

//get all timezones
router.get('/', getAllTimezones);

//get single timezones
router.get('/:timezoneId', getTimezone);

//create timezone
router.post('/', createTimezone);

//update timezone
router.put('/:timezoneId', updateTimezone);

//delete timezone
router.delete('/:timezoneId', deleteTimezone);

module.exports = router;