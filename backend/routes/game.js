const router = require('express').Router();
const Game = require('../models/Game');

// Get all games
router.route('/').get((req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  const playerStats = {
    [player1]: { wins: 0, losses: 0, draws: 0 },
    [player2]: { wins: 0, losses: 0, draws: 0 },
  };

  const newGame = new Game({
    player1,
    player2,
    playerStats,
    wins: 0,
    losses: 0,
    draws: 0,
    rounds: [],
  });

  newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update game data
router.route('/update/:id').put((req, res) => {
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


// End a game 
router.route('/end/:id').post((req, res) => {
  Game.findById(req.params.id)
    .then(game => {
      game.isActive = false;
      game.save()
        .then(() => res.json('Game ended!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Delete 
router.route('/deleteAll').delete((req, res) => {
  Game.deleteMany({})
    .then(() => res.json('All games deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
