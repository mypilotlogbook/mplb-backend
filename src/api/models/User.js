const mongoose = require('mongoose');

const UserScheama = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    age: {
        type: String,
    },
    description: {
        type: String,
    },
    country: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1664302664418-5cdb6fc10748?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    company: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserScheama);