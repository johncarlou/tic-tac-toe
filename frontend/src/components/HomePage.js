import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ startNewGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <button onClick={startNewGame}>Start New Game</button>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            {game.player1} vs {game.player2} - Winner: {(game.wins ? game.player1 : game.player2)} - Losses: {(game.losses ? game.player1 : game.player2)} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
