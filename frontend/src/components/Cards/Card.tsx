import React from 'react';

const totalNumCards = 52;
const suits = ['Heart', 'Spade', 'Club', 'Diamond'];
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const VALUE_MAP = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const randomizePosition = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDeckOfCards = () => {
  const deck: { cardFace: string; suit: string; value: any; }[] = [];
  for (const suit of suits) {
    for (const card of cards) {
      deck.push({
        cardFace: card,
        suit: suit,
        value: VALUE_MAP[card],
      });
    }
  }
  return deck;
};

const shuffle = (deck: any[]) => {
  const shuffledDeck = new Array(totalNumCards);
  const filledSlots: number[] = [];
  for (let i = 0; i < totalNumCards; i++) {
    if (i === 51) {
      const lastSlot = shuffledDeck.findIndex((el) => typeof el == 'undefined');
      shuffledDeck[lastSlot] = deck[i];
      filledSlots.push(lastSlot);
    } else {
      let shuffleToPosition = randomizePosition(0, totalNumCards - 1);
      while (filledSlots.includes(shuffleToPosition)) {
        shuffleToPosition = randomizePosition(0, totalNumCards - 1);
      }
      shuffledDeck[shuffleToPosition] = deck[i];
      filledSlots.push(shuffleToPosition);
    }
  }
  return shuffledDeck;
};

