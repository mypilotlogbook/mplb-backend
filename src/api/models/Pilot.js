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
        default: 'https://res.cloudinary.com/dv9ax00l4/image/upload/v1723890106/user-profile-img-removebg-preview_rlafow.png'
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