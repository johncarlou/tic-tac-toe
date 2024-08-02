import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ startNewGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`https://tictactoe-backend-five.vercel.app/games`);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className ="container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <button onClick={startNewGame}>Start New Game</button>
      <ul className='ul-container'>
        {games.map((game) => (
          <li key={game._id} className = "score-board">
            <h1>
              {game.player1} vs {game.player2}
            </h1>
            <div className='div-stats'>
              <div className='div-stats-inner'>
                <h2>{game.player1} Stats</h2>
                <p>Wins: {game.playerStats?.[game.player1]?.wins || 0}</p>
                <p>Losses: {game.playerStats?.[game.player1]?.losses || 0}</p>
                <p>Draws: {game.playerStats?.[game.player1]?.draws || 0}</p>
              </div>
              <div className='div-stats-inner'>
                <h2>{game.player2} Stats</h2>
                <p>Wins: {game.playerStats?.[game.player2]?.wins || 0}</p>
                <p>Losses: {game.playerStats?.[game.player2]?.losses || 0}</p>
                <p>Draws: {game.playerStats?.[game.player2]?.draws || 0}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
