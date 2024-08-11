const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema({
    location: String,
    description: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Disaster', disasterSchema)