import React, { useEffect, useState } from 'react';

const NewGame = ({ startGame }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleStart = () => {
    startGame(player1, player2);
  };
  useEffect(() => {
    // Apply styles to the entire body
    document.body.style.backgroundColor = '#FFD700';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Cleanup function to reset styles when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const styles = {
    h1: {
      color:'black',
    }
  };
  return (
    <div>
      <h2 style={styles.h1}>Enter Player Names</h2>
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