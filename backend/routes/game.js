const router = require('express').Router();
let Game = require('../models/Game');

router.route('/').get((req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  const newGame = new Game({ player1, player2 });

  newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Game.findById(req.params.id)
    .then(game => {
      game.rounds.push(req.body.round);
      game.stats = req.body.stats;

      game.save()
        .then(() => res.json('Game updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

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

module.exports = router;
