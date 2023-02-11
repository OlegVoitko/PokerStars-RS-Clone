import { findBestCombination } from './gameHelper';
// import * as data from './mockCombinations';
// import { POKER_COMBINATIONS } from "./constants";
//
// const user1 = findBestCombination(data.boardStreet, data.boardStreet);
// const user2 = findBestCombination(data.boardFullHouse, data.handFullHouse);
//
// test('winner', () => {
//   const { combinationRating } = findBestCombination(data.boardNothing, data.handNothing);
//   expect(combinationRating).toBe(POKER_COMBINATIONS.HIGH_CARD);
// });
/* eslint-disable */
//comb TWO_PAIRS
export const userTWO_PAIRS = {
    _id: '1676152320491',
    nickname: 'Guest',
    password: '',
    bankroll: 10000,
    gameState: {
      hand: [
        {
          cardFace: '4',
          suit: 'Diamond',
          value: 3
        },
        {
          cardFace: '4',
          suit: 'Heart',
          value: 3
        }
      ],
      stack: 10000,
      state: 'wait',
      bet: 0,
      action: '',
      bestCombination: [
        {
          cardFace: '4',
          suit: 'Heart',
          value: 3
        },
        {
          cardFace: '4',
          suit: 'Diamond',
          value: 3
        },
        {
          cardFace: '9',
          suit: 'Club',
          value: 8
        },
        {
          cardFace: '9',
          suit: 'Spade',
          value: 8
        }
      ],
      restBestCards: [
        {
          cardFace: 'J',
          suit: 'Diamond',
          value: 10
        }
      ],
      combinationRating: 3
    }
  };

//comb ONE_PAIR
export const userONE_PAIR = {
    _id: '1676152319188',
    nickname: 'Guest',
    password: '',
    bankroll: 10000,
    gameState: {
      hand: [
        {
          cardFace: 'Q',
          suit: 'Diamond',
          value: 11
        },
        {
          cardFace: 'A',
          suit: 'Club',
          value: 13
        }
      ],
      stack: 10000,
      state: 'wait',
      bet: 0,
      action: '',
      bestCombination: [
        {
          cardFace: '9',
          suit: 'Club',
          value: 8
        },
        {
          cardFace: '9',
          suit: 'Spade',
          value: 8
        }
      ],
      restBestCards: [
        {
          cardFace: 'J',
          suit: 'Diamond',
          value: 10
        },
        {
          cardFace: 'Q',
          suit: 'Diamond',
          value: 11
        },
        {
          cardFace: 'A',
          suit: 'Club',
          value: 13
        }
      ],
      combinationRating: 2
    }
  };

//comb TWO_PAIRS
export const userTWO_PAIRS2 = {
  _id: '1676153782692',
  nickname: 'Guest',
  password: '',
  bankroll: 10000,
  gameState: {
    hand: [
      {
        cardFace: '9',
        suit: 'Diamond',
        value: 8
      },
      {
        cardFace: '9',
        suit: 'Heart',
        value: 8
      }
    ],
    stack: 10000,
    state: 'wait',
    bet: 0,
    action: '',
    bestCombination: [
      {
        cardFace: '7',
        suit: 'Spade',
        value: 6
      },
      {
        cardFace: '7',
        suit: 'Diamond',
        value: 6
      },
      {
        cardFace: '9',
        suit: 'Heart',
        value: 8
      },
      {
        cardFace: '9',
        suit: 'Diamond',
        value: 8
      }
    ],
    restBestCards: [
      {
        cardFace: 'A',
        suit: 'Heart',
        value: 13
      }
    ],
    combinationRating: 3
  }
};

//comb FULL_HOUSE
export const userFULL_HOUSE = {
    _id: '1676153771562',
    nickname: 'Guest',
    password: '',
    bankroll: 10000,
    gameState: {
      hand: [
        {
          cardFace: 'A',
          suit: 'Spade',
          value: 13
        },
        {
          cardFace: 'A',
          suit: 'Diamond',
          value: 13
        }
      ],
      stack: 10000,
      state: 'wait',
      bet: 0,
      action: '',
      bestCombination: [
        {
          cardFace: 'A',
          suit: 'Diamond',
          value: 13
        },
        {
          cardFace: 'A',
          suit: 'Spade',
          value: 13
        },
        {
          cardFace: 'A',
          suit: 'Heart',
          value: 13
        },
        {
          cardFace: '7',
          suit: 'Spade',
          value: 6
        },
        {
          cardFace: '7',
          suit: 'Diamond',
          value: 6
        }
      ],
      restBestCards: [],
      combinationRating: 7
    }
};

//comb HIGH_CARD
export const userHIGH_CARD = {
  _id: '1676154231788',
  nickname: 'Guest',
  password: '',
  bankroll: 10000,
  gameState: {
    hand: [
      {
        cardFace: '6',
        suit: 'Spade',
        value: 5
      },
      {
        cardFace: '5',
        suit: 'Club',
        value: 4
      }
    ],
    stack: 10000,
    state: 'wait',
    bet: 0,
    action: '',
    bestCombination: [
      {
        cardFace: 'A',
        suit: 'Club',
        value: 13
      }
    ],
    restBestCards: [
      {
        cardFace: '7',
        suit: 'Club',
        value: 6
      },
      {
        cardFace: '9',
        suit: 'Diamond',
        value: 8
      },
      {
        cardFace: 'Q',
        suit: 'Heart',
        value: 11
      },
      {
        cardFace: 'K',
        suit: 'Spade',
        value: 12
      }
    ],
    combinationRating: 1
  }
};

//comb STRAIGHT
export const userSTRAIGHT = {
  _id: '1676154231789',
  nickname: 'Guest',
  password: '',
  bankroll: 10000,
  gameState: {
    hand: [
      {
        cardFace: '6',
        suit: 'Spade',
        value: 5
      },
      {
        cardFace: '5',
        suit: 'Club',
        value: 4
      }
    ],
    stack: 10000,
    state: 'wait',
    bet: 0,
    action: '',
    bestCombination: [
      { cardFace: '3', suit: 'Club', value: 2 },
      { cardFace: '4', suit: 'Heart', value: 3 },
      { cardFace: '5', suit: 'Heart', value: 4 },
      { cardFace: '6', suit: 'Spade', value: 5 },
      { cardFace: '7', suit: 'Heart', value: 6 }
    ],
    restBestCards: [],
    combinationRating: 5
  }
};

//comb FLUSH
export const userFLUSH = {
  _id: '1676154231790',
  nickname: 'Guest',
  password: '',
  bankroll: 10000,
  gameState: {
    hand: [
      {
        cardFace: '6',
        suit: 'Spade',
        value: 5
      },
      {
        cardFace: '5',
        suit: 'Club',
        value: 4
      }
    ],
    stack: 10000,
    state: 'wait',
    bet: 0,
    action: '',
    bestCombination: [
      { cardFace: '3', suit: 'Club', value: 2 },
      { cardFace: '4', suit: 'Heart', value: 3 },
      { cardFace: '5', suit: 'Heart', value: 4 },
      { cardFace: '6', suit: 'Spade', value: 5 },
      { cardFace: '7', suit: 'Heart', value: 6 }
    ],
    restBestCards: [],
    combinationRating: 5
  }
};

//comb FLUSH2
export const userFLUSH2 = {
  _id: '1676154231791',
  nickname: 'Guest',
  password: '',
  bankroll: 10000,
  gameState: {
    hand: [
      {
        cardFace: '6',
        suit: 'Spade',
        value: 5
      },
      {
        cardFace: '5',
        suit: 'Club',
        value: 4
      }
    ],
    stack: 10000,
    state: 'wait',
    bet: 0,
    action: '',
    bestCombination: [
      { cardFace: '8', suit: 'Club', value: 7 },
      { cardFace: '9', suit: 'Heart', value: 8 },
      { cardFace: '10', suit: 'Heart', value: 9 },
      { cardFace: '11', suit: 'Spade', value: 10 },
      { cardFace: '12', suit: 'Heart', value: 11 }
    ],
    restBestCards: [],
    combinationRating: 5
  }
};