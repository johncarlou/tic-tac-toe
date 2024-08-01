import React, { useState } from 'react';

const NewGame = ({ startGame }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStart = () => {
    startGame(player1, player2);
  };

  return (
    <div>
      <h2>Enter Player Names</h2>
      <input
        type="text"
        placeholder="Player 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Player 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default NewGame;
