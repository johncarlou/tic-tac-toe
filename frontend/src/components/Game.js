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
    const winnerSymbol = calculateWinner(board);
    if (winnerSymbol) {
      setWinner(winnerSymbol === 'X' ? player1 : player2);
    } else {
      setWinner(null);
    }
  }, [board]);

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
    if (winner) {
      const winnerPlayer = winner === 'X' ? player1 : player2;
      const loserPlayer = winner === 'X' ? player2 : player1;
      updatedStats[winnerPlayer].wins += 1;
      updatedStats[loserPlayer].losses += 1;
    } else if (!board.includes(null)) {
      updatedStats[player1].draws += 1;
      updatedStats[player2].draws += 1;
    }

    axios.put(`http://localhost:5000/games/${gameId}`, {
      stats: updatedStats,
    }).then(() => {
      setPlayerStats(updatedStats);
      endGame();
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
