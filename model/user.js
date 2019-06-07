var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    patent: String,
    age: Number,
    type: String,
    registry: String,
    password: String,
});

module.exports = mongoose.model('User', UserSchema);
