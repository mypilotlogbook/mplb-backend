const mongoose = require('mongoose');

const AirfieldSchema = new mongoose.Schema({
    airfield_code : {
        type: String,
    },
    country : {
        type: String,
    },
    airfield_category: {
        type: String,
    },
    icao: {
        type: String,
    },
    iata: {
        type: String,
    },
    airport_name: {
        type: String,
    },
    elevation: {
        type: String,
    },
    timezone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timezone',
    },
    nearByCity: {
        type: String,
    },
    notes: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Airfield', AirfieldSchema);