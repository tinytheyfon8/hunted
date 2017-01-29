var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    player1_id: String,
    player2_id: String,
    player1_score: Number,
    player2_score: Number
});

module.exports = mongoose.model('Game', gameSchema);