const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://john:john2024@cluster0.lt7s1va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  wins: Number,
  losses: Number,
  draws: Number,
  rounds: Array,
});

const Game = mongoose.model('Game', gameSchema);

app.use(cors());
app.use(express.json());

// Get all games
app.get('/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// server.js

// Update game data
app.put('/games/:id', async (req, res) => {
    const { id } = req.params;
    const { wins, losses, draws } = req.body;
    
    try {
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { $set: { wins, losses, draws } },
        { new: true }
      );
      res.json(updatedGame);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// Start a new game
app.post('/games', async (req, res) => {
  const { player1, player2 } = req.body;
  const newGame = new Game({
    player1,
    player2,
    wins: 0,
    losses: 0,
    draws: 0,
    rounds: [],
  });
  await newGame.save();
  res.json(newGame);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
