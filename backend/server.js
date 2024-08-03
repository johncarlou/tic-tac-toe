require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game');
const gameRoutes = require('./routes/game');

const app = express();

app.use(cors({
  origin: 'https://tic-tac-toe-gamma-drab.vercel.app',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials
}));

app.use(express.json());

PORT=5000
// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONN)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Tic-Tac-Toe API');
});

// Use game routes
app.use('/games', gameRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port`, process.env.PORT);
});
