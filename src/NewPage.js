import React from 'react';

const NewPage = ({ turns, shuffleCard }) => {
  return (
    <div>
      <h1>Congratulations You win</h1>
      <h4>To win this game you tried {turns} times</h4>

      <button onClick={shuffleCard}>Try again</button>
    </div>
  );
};

export default NewPage;
