import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HomePage = ({ startNewGame }) => {
  const [games, setGames] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/games`);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:5000/games/deleteAll'); // Adjust URL if necessary
      setGames([]); // Clear local state
    } catch (error) {
      console.error('Error deleting games:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="d-flex flex-column align-items-center mb-3">
        <button className="btn btn-success mb-2" onClick={startNewGame}>
          Start New Game
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Clear Records
        </button>
      </div>
      <ul className='ul-container'>
        {games.map((game) => (
          <li key={game._id} className="score-board">
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
