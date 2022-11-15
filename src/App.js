import React, { useEffect, useState } from 'react';

import './App.css';
import NewPage from './NewPage';
// import NewPage from './NewPage';
import SingleCard from './SingleCard';

const cardImages = [
  { src: '/img/base.jpeg', matched: false },
  { src: '/img/bear.jpeg', matched: false },
  { src: '/img/c.jpg', matched: false },
  { src: '/img/fella.webp', matched: false },
  { src: '/img/fox.jpeg', matched: false },
  { src: '/img/minions.jpeg', matched: false },
  { src: '/img/spider.jpeg', matched: false },
  { src: '/img/tesla.jpeg', matched: false },
  { src: '/img/AcetoFive.jpeg', matched: false },
  { src: '/img/ca.webp', matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCard = () => {
    const shuffledCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCard);
    setTurn(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCars) => {
          return prevCars.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCard();
  }, []);

  const getMatches = cards.map((match) => match.matched);

  return (
    <div className='App'>
      {getMatches.every((e) => e === true) ? (
        <NewPage className='zipme' turns={turn} shuffleCard={shuffleCard} />
      ) : (
        <div>
          <h2>Memory Game</h2>
          <button onClick={shuffleCard}>New Game</button>

          {/* // */}

          <div className='card-grid'>
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card.matched || card === choiceOne || card === choiceTwo
                }
                disabled={disabled}
              />
            ))}
          </div>
          <p>You tried to complete this {turn} times</p>
        </div>
      )}
    </div>
  );
};

export default App;
