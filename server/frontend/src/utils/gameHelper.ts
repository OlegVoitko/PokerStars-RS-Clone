import { ICard, IUser } from '../types/interfaces';
import { CARD_DECK, POKER_COMBINATIONS } from '../utils/constants';

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

export const deal = (count: number, deck: ICard[]) => {
  let currentCard = 0;
  const hands = Array(count);
  for (let i = 0; i < count; i += 1) {
    hands[i] = [deck[currentCard], deck[currentCard + 1]];
    currentCard += 2;
  }
  return hands;
};

export const findBestCombination = (
  board: ICard[],
  hand: ICard[]
): { restBestCards: ICard[]; bestCombination: ICard[]; combinationRating: number } => {
  const bestCombination: ICard[] = [];
  const restBestCards: ICard[] = [];
  let combinationRating = 0;
  const concatCards = [...board, ...hand];
  const sortCardsByValue = concatCards.sort((a, b) => (a.value > b.value ? 1 : -1));
  const combineCardsByValue = concatCards.reduce((a, b) => {
    Object.prototype.hasOwnProperty.call(a, b.cardFace)
      ? a[b.cardFace].push(b)
      : (a[b.cardFace] = [b]);
    return a;
  }, {} as { [cardFace: string]: ICard[] });
  const combineCardsBySuit = concatCards.reduce((a, b) => {
    Object.prototype.hasOwnProperty.call(a, b.suit) ? a[b.suit].push(b) : (a[b.suit] = [b]);
    // a.hasOwnProperty(b.suit) ? a[b.suit].push(b) : (a[b.suit] = [b]);
    return a;
  }, {} as { [suit: string]: ICard[] });

  //RoyalFlush, StraightFlush, Flush
  //TODO StraightFlush `A2345`
  const fiveCardsBySuit = Object.entries(combineCardsBySuit).filter((obj) => obj[1].length >= 5);

  if (fiveCardsBySuit.length) {
    const cardValues = fiveCardsBySuit[0][1].map((c) => c.value).sort((a, b) => b - a);
    for (let i = 0; i <= cardValues.length - 5; i++) {
      if (cardValues[i] - cardValues[i + 4] === 4) {
        combinationRating =
          i === 0 ? POKER_COMBINATIONS.ROYAL_FLUSH : POKER_COMBINATIONS.STRAIGHT_FLUSH;
        bestCombination.push(...fiveCardsBySuit[0][1].slice(2 - i, 7 - i));
        restBestCards.push(...bestCombination);
        return { bestCombination, restBestCards, combinationRating };
      }
    }
  }

  //FourKind
  const fourCardsByValue = Object.entries(combineCardsByValue).filter((obj) => obj[1].length === 4);

  if (fourCardsByValue.length) {
    combinationRating = POKER_COMBINATIONS.FOUR_KIND;
    bestCombination.push(...fourCardsByValue[0][1]);
    const lastBestCard = sortCardsByValue
      .filter((obj) => obj.cardFace !== fourCardsByValue[0][0])
      .pop();
    lastBestCard && restBestCards.push(lastBestCard);
    return { bestCombination, restBestCards, combinationRating };
  }

  //FullHouse
  const threeCardsByValue = Object.entries(combineCardsByValue).filter(
    (obj) => obj[1].length === 3
  );
  const twoCardsByValue = Object.entries(combineCardsByValue).filter((obj) => obj[1].length >= 2);
  if (threeCardsByValue.length && twoCardsByValue.length) {
    if (threeCardsByValue.length === 1 && twoCardsByValue.length > 1) {
      const TC = twoCardsByValue.filter((obj) => obj[0] !== threeCardsByValue[0][0]);
      bestCombination.push(...threeCardsByValue[0][1], ...TC[TC.length - 1][1].slice(0, 2));
      combinationRating = POKER_COMBINATIONS.FULL_HOUSE;
      return { bestCombination, restBestCards, combinationRating };
    }
    if (twoCardsByValue.length === 1 && threeCardsByValue.length > 1) {
      const TC = threeCardsByValue.filter((obj) => obj[0] !== twoCardsByValue[0][0]);
      bestCombination.push(...twoCardsByValue[0][1], ...TC[0][1]);
      combinationRating = POKER_COMBINATIONS.FULL_HOUSE;
      return { bestCombination, restBestCards, combinationRating };
    }
    if (twoCardsByValue.length > 1 && threeCardsByValue.length > 1) {
      const bestThree = threeCardsByValue[threeCardsByValue.length - 1];
      const bestTwo = twoCardsByValue.filter((obj) => obj[0] !== bestThree[0][0]);
      bestCombination.push(...bestThree[1], ...bestTwo[bestTwo.length - 1][1].slice(0, 2));
      combinationRating = POKER_COMBINATIONS.FULL_HOUSE;
      return { bestCombination, restBestCards, combinationRating };
    }
  }

  //flush
  if (fiveCardsBySuit.length) {
    combinationRating = POKER_COMBINATIONS.FLUSH;
    bestCombination.push(...fiveCardsBySuit[0][1].slice(-5));
    return { bestCombination, restBestCards, combinationRating };
  }

  // street
  //TODO Street `A2345`
  if (Object.keys(combineCardsByValue).length >= 5) {
    const cardValues = sortCardsByValue.map((c) => c.value).sort((a, b) => b - a);
    for (let i = 0; i < 3; i++) {
      if (cardValues[i] - cardValues[i + 4] === 4) {
        combinationRating = POKER_COMBINATIONS.STRAIGHT;
        bestCombination.push(...sortCardsByValue.slice(2 - i, 7 - i));
        return { bestCombination, restBestCards, combinationRating };
      }
    }
  }

  //ONE tree
  if (threeCardsByValue.length) {
    const bestThree = threeCardsByValue[threeCardsByValue.length - 1];
    bestCombination.push(...bestThree[1]);
    const lastBestCards = sortCardsByValue
      .filter((obj) => obj.cardFace !== bestThree[0][0])
      .slice(-2);
    restBestCards.push(...lastBestCards);
    combinationRating = POKER_COMBINATIONS.THREE_KIND;
    return { bestCombination, restBestCards, combinationRating };
  }

  //two PAIRs
  if (twoCardsByValue.length >= 2) {
    const bestTwo = twoCardsByValue.slice(-2).map((obj) => obj[1]);
    const bestTwoNames = twoCardsByValue.slice(-2).map((obj) => obj[0]);
    bestCombination.push(...bestTwo[0].concat(bestTwo[1]));
    const lastBestCard = sortCardsByValue
      .filter((obj) => obj.cardFace !== bestTwoNames[0] && obj.cardFace !== bestTwoNames[1])
      .slice(-1);
    restBestCards.push(...lastBestCard);
    combinationRating = POKER_COMBINATIONS.TWO_PAIRS;
    return { bestCombination, restBestCards, combinationRating };
  }

  //one PAIRs
  if (twoCardsByValue.length === 1) {
    bestCombination.push(...twoCardsByValue[0][1]);
    const lastBestCards = sortCardsByValue
      .filter((obj) => obj.cardFace !== twoCardsByValue[0][0])
      .slice(-3);
    restBestCards.push(...lastBestCards);
    combinationRating = POKER_COMBINATIONS.ONE_PAIR;
    return { bestCombination, restBestCards, combinationRating };
  }

  bestCombination.push(...sortCardsByValue.slice(-1));
  restBestCards.push(...sortCardsByValue.slice(-5, -1));
  combinationRating = POKER_COMBINATIONS.HIGH_CARD;

  return { bestCombination, restBestCards, combinationRating };
};

export const getSortedCardsValuesDesc = (cards: ICard[]): number[] => {
  return cards.map((card) => card.value).sort((a, b) => b - a);
};

export const findBestArrayOfCards = (cards: number[][], length: number, index: number = 0): number[] => {
  if (cards.length === 1 || index === length) {
    return cards[0];
  } else {
    const bestNums = cards.map((c) => c[index]);
    const maxVal = Math.max(...bestNums);
    const newArrCards = cards.filter((arr) => arr[index] === maxVal);
    return findBestArrayOfCards(newArrCards, length, index += 1);
  }
};

export const getWinner = (users: IUser[]): IUser | IUser[] => {
  const bestRatingCombination = Math.max(...users.map((user) => user.gameState.combinationRating));
  //if exist 1 best rating
  const winners = users.filter(
    (user) => user.gameState.combinationRating === bestRatingCombination
  );
  if (winners.length === 1) return winners;

  //if best combinations equal (on the deck for ex)
  const bestCombinations = winners.map((user) =>
    JSON.stringify(getSortedCardsValuesDesc(user.gameState.bestCombination))
  );
  const restBestCards = winners.map((user) =>
    JSON.stringify(getSortedCardsValuesDesc(user.gameState.restBestCards))
  );
  if (
    bestCombinations.every((comb) => comb === bestCombinations[0]) &&
    restBestCards.every((comb) => comb === restBestCards[0])
  )
    return winners;

  //combinations where can be only 1 best card in bestCombinations && no restBestCards
  if (
    bestRatingCombination === POKER_COMBINATIONS.STRAIGHT_FLUSH ||
    bestRatingCombination === POKER_COMBINATIONS.FLUSH ||
    bestRatingCombination === POKER_COMBINATIONS.STRAIGHT
  ) {
    const bestPlayer = winners.reduce((acc, curr) =>
      acc.gameState.bestCombination[acc.gameState.bestCombination.length - 1].value >
      curr.gameState.bestCombination[curr.gameState.bestCombination.length - 1].value
        ? acc
        : curr
    );
    return bestPlayer;
  }

  //FOUR_KIND
  if (bestRatingCombination === POKER_COMBINATIONS.FOUR_KIND) {
    const fourKindValues = winners.map((user) => user.gameState.bestCombination[0].value);
    if (Array.from(new Set(fourKindValues)).length === 1) {
      const restCardValue = winners.map((user) => user.gameState.restBestCards[0].value);
      const maxRest = Math.max(...restCardValue);
      return winners.filter((user) => user.gameState.restBestCards[0].value === maxRest);
    } else {
      const maxFour = Math.max(...fourKindValues);
      return winners.filter((user) => user.gameState.bestCombination[0].value === maxFour);
    }
  }

  //HIGH_CARD
  // if (bestRatingCombination === POKER_COMBINATIONS.HIGH_CARD) {
  //   const highCardValue = winners.map((user) => user.gameState.bestCombination[0].value);
  //   const maxHighCard = Math.max(...highCardValue);
  //   const winnersWithHighCard = winners.filter(
  //     (user) => user.gameState.bestCombination[0].value === maxHighCard
  //   );
  //   if (winnersWithHighCard.length !== 1) {
  //     const restCardValues = winnersWithHighCard.map((user) =>
  //       getSortedCardsValuesDesc(user.gameState.restBestCards)
  //     );
  //     const bestCombination = findBestArrayOfCards(restCardValues);
  //     const indexesOfWinners = restCardValues.reduce(
  //       (acc, cur, index) =>
  //         JSON.stringify(cur) === JSON.stringify(bestCombination) ? [...acc, index] : acc,
  //       []
  //     );
  //     const result: IUser[] = [];
  //     indexesOfWinners.forEach((i) => result.push(winnersWithHighCard[i]));
  //     return result;
  //   } else {
  //     return winnersWithHighCard;
  //   }
  // }

  return winners;
};
