// routes/game.js
const router = require('express').Router();
const Game = require('../models/Game');

// Define your routes
router.get('/', (req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const { player1, player2 } = req.body;

  if (!player1 || !player2) {
    return res.status(400).json({ message: 'Both player1 and player2 are required' });
  }

  const playerStats = {
    [player1]: { wins: 0, losses: 0, draws: 0 },
    [player2]: { wins: 0, losses: 0, draws: 0 },
  };

  const newGame = new Game({
    player1,
    player2,
    playerStats,
    rounds: [],
  });

  newGame.save()
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update records
router.put('/update/:id', (req, res) => {
  Game.findById(req.params.id)
    .then(game => {
      if (!game) {
        return res.status(404).json('Game not found');
      }

      game.rounds.push(req.body.round);
      game.playerStats = req.body.playerStats;

      game.save()
        .then(() => res.json('Game updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.delete('/deleteAll', (req, res) => {
  Game.deleteMany({})
    .then(() => res.json('All games deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
