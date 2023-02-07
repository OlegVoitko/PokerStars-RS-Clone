import { ICard } from '../types/interfaces';
import { CARD_DECK } from '../utils/constants';

interface IValueMap {
  [key: string]: number;
}

const VALUE_MAP: IValueMap = {
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
  const deck: ICard[] = [];
  for (const suit of CARD_DECK.suits) {
    for (const card of CARD_DECK.cards) {
      deck.push({
        cardFace: card,
        suit: suit,
        value: VALUE_MAP[card],
      });
    }
  }
  return deck;
};

export const shuffle = (): ICard[] => {
  const deck = generateDeckOfCards();
  const shuffledDeck = new Array(CARD_DECK.totalNumCards);
  const filledSlots: number[] = [];
  for (let i = 0; i < CARD_DECK.totalNumCards; i++) {
    if (i === 51) {
      const lastSlot = shuffledDeck.findIndex((el) => typeof el == 'undefined');
      shuffledDeck[lastSlot] = deck[i];
      filledSlots.push(lastSlot);
    } else {
      let shuffleToPosition = randomizePosition(0, CARD_DECK.totalNumCards - 1);
      while (filledSlots.includes(shuffleToPosition)) {
        shuffleToPosition = randomizePosition(0, CARD_DECK.totalNumCards - 1);
      }
      shuffledDeck[shuffleToPosition] = deck[i];
      filledSlots.push(shuffleToPosition);
    }
  }
  return shuffledDeck;
};

// export const deal = (count: number, deck: ICard[]) => {
//   let currentCard = 0;
//   const hands = Array(count);
//   for (let i = 0; i < count; i += 1) {
//     hands[i] = [deck[currentCard], deck[currentCard + 1]];
//     currentCard += 2;
//   }
//   return hands;
// };
