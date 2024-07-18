const mongoose = require('mongoose');

const TimezoneSchema = new mongoose.Schema({
    timezone: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Timezone', TimezoneSchema);