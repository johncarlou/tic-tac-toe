const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game');

const app = express();

// Custom CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tic-tac-toe-app-mauve.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Apply CORS middleware
app.use(
  cors({
    origin: 'https://tic-tac-toe-app-mauve.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`${process.env.MONG_DBCONNECTION}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define routes
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/games', async (req, res) => {
  const { player1, player2 } = req.body;
  const newGame = new Game({
    player1,
    player2,
    playerStats: {
      [player1]: { wins: 0, losses: 0, draws: 0 },
      [player2]: { wins: 0, losses: 0, draws: 0 },
    },
    rounds: [],
  });
  try {
    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { playerStats } = req.body;

  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update player stats
    game.playerStats = playerStats;
    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
