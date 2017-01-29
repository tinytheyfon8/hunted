var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    token: String,
    name: String,
    email: String,
    scores: [String]
});

module.exports = mongoose.model('User', userSchema);