const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
}, { _id: false });

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  playerStats: {
    type: Map,
    of: playerStatsSchema,
  },
  rounds: { type: Array, default: [] },
});

module.exports = mongoose.model('Game', gameSchema);