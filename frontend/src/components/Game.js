import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = ({ gameId, player1, player2, endGame }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    [player1]: { wins: 0, losses: 0, draws: 0 },
    [player2]: { wins: 0, losses: 0, draws: 0 },
  });

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/${gameId}`);
        const { playerStats } = response.data;
        setPlayerStats(playerStats || {
          [player1]: { wins: 0, losses: 0, draws: 0 },
          [player2]: { wins: 0, losses: 0, draws: 0 },
        });
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [gameId, player1, player2]);

  useEffect(() => {
    const winnerSymbol = calculateWinner(board);
    if (winnerSymbol) {
      setWinner(winnerSymbol === 'X' ? player1 : player2);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    } else {
      setWinner(null);
    }
  }, [board, player1, player2]);

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (newBoard[index] || winner) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleEndGame = () => {
    const updatedStats = { ...playerStats };
    if (winner && winner !== 'Draw') {
      const winnerPlayer = winner;
      const loserPlayer = winner === player1 ? player2 : player1;
      updatedStats[winnerPlayer].wins += 1;
      updatedStats[loserPlayer].losses += 1;
    } else if (winner === 'Draw') {
      updatedStats[player1].draws += 1;
      updatedStats[player2].draws += 1;
    }

    axios.put(`${process.env.REACT_APP_API_URL}/games/${gameId}`, {
      playerStats: updatedStats,
    })
    .then(() => {
      setPlayerStats(updatedStats);
      endGame();
    })
    .catch(error => {
      console.error('Error updating game stats:', error);
    });
  };

  const isDraw = () => {
    return !board.includes(null) && !winner;
  };

  return (
    <div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Current player: ${xIsNext ? player1 : player2}`}
      </div>
      <div className="board">
        {board.map((value, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      {(winner || isDraw()) && (
        <div>
          <button onClick={handleEndGame}>Stop</button>
          <button onClick={() => setBoard(Array(9).fill(null))}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default Game;
