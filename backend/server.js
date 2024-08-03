require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game');
const gameRoutes = require('./routes/game');

const app = express();

//enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_CONN)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
  res.send('Welcome to the Tic-Tac-Toe API');
});

app.use('/games', gameRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
