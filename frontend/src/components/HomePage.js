import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ startNewGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <button onClick={startNewGame}>Start New Game</button>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            {game.player1} vs {game.player2}
            <div>
              <h2>{game.player1} Stats</h2>
              <p>Wins: {game.playerStats?.[game.player1]?.wins || 0}</p>
              <p>Losses: {game.playerStats?.[game.player1]?.losses || 0}</p>
              <p>Draws: {game.playerStats?.[game.player1]?.draws || 0}</p>
            </div>
            <div>
              <h2>{game.player2} Stats</h2>
              <p>Wins: {game.playerStats?.[game.player2]?.wins || 0}</p>
              <p>Losses: {game.playerStats?.[game.player2]?.losses || 0}</p>
              <p>Draws: {game.playerStats?.[game.player2]?.draws || 0}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
