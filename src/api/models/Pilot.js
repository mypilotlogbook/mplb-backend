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
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1632283409723-4cd4560e0857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
}, { timestamps: true });

module.exports = mongoose.model('Pilot', PilotScheama);