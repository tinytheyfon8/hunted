var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    google_id: String,
    token: String,
    name: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);