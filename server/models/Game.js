var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    player_id: String,
    player_type: String,
    player_score: Number,
    player_won: Boolean,
    date: Date
});

module.exports = mongoose.model('Game', gameSchema);