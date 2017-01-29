var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    player1_id: String,
    player1_score: Number,
    player2_id: String,
    player2_score: Number,
    date: Date
});

module.exports = mongoose.model('Game', gameSchema);