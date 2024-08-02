import React, { useState } from 'react';
import HomePage from './components/HomePage';
import NewGame from './components/NewGame';
import Game from './components/Game';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [page, setPage] = useState('home');
  const [currentGame, setCurrentGame] = useState(null);

  const startNewGame = () => {
    setPage('newGame');
  };

  const startGame = (player1, player2) => {
    axios.post('http://localhost:5000/games', { player1, player2 })
      .then((response) => {
        setCurrentGame(response.data);
        setPage('game');
      });
  };

  const endGame = () => {
    setPage('home');
    setCurrentGame(null);
  };

  return (
    <div>
      {page === 'home' && <HomePage startNewGame={startNewGame} />}
      {page === 'newGame' && <NewGame startGame={startGame} />}
      {page === 'game' && currentGame && (
        <Game
          gameId={currentGame._id}
          player1={currentGame.player1}
          player2={currentGame.player2}
          endGame={endGame}
        />
      )}
    </div>
  );
};

export default App;

