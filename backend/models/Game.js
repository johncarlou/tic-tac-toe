const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  wins: Number,
  losses: Number,
  draws: Number,
  rounds: Array, // To track individual rounds
});



module.exports = mongoose.model('Game', gameSchema);
