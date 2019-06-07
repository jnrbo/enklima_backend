let mongoose = require('mongoose');

let OccurrenceSchema = new mongoose.Schema({
    officerName: String,
    type: String,
    victims: Boolean,
    approved: Boolean,
    local: String,
    date: Date,
});

module.exports = mongoose.model('Occurrence', OccurrenceSchema);
