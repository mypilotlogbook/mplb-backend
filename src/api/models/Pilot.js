const mongoose = require('mongoose');

const PilotScheama = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    employee_id: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: String,
    },
    address: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Pilot', PilotScheama);