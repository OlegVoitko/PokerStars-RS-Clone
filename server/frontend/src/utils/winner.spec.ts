import { getWinner, findBestArrayOfCards } from './gameHelper';
import * as users from './mockWinner';
import {userTWO_PAIRS2} from "./mockWinner";

// test('winnerFlush', () => {
//   const winner = getWinner([users.userFLUSH, users.userONE_PAIR, users.userFLUSH2]);
//   expect(winner).toBe(users.userFLUSH2);
// });

test('winner Same Combinations On Table', () => {
  const winners = getWinner([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS]);
  expect(winners).toEqual([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS]);
});

test('winner Same Combinations On Table with different suits but equal nums', () => {
  const winners = getWinner([
    users.userTWO_PAIRS,
    users.user1TWO_PAIRS,
    users.user2TWO_PAIRS,
    users.user3TWO_PAIRS,
    users.user4TWO_PAIRS,
  ]);
  expect(winners).toEqual([
    users.userTWO_PAIRS,
    users.user1TWO_PAIRS,
    users.user2TWO_PAIRS,
    users.user3TWO_PAIRS,
    users.user4TWO_PAIRS,
  ]);
});

test('four kind with same four', () => {
  const winners = getWinner([users.userFOUR_KIND, users.userFOUR_KIND2, users.userFOUR_KIND3]);
  expect(winners).toEqual([users.userFOUR_KIND]);
});

test('four kind with different four', () => {
  const winners = getWinner([users.userFOUR_KIND4, users.userFOUR_KIND3]);
  expect(winners).toEqual([users.userFOUR_KIND3]);
});

test('equal HIGH_CARD', () => {
  const winners = getWinner([users.userHIGH_CARD1, users.userHIGH_CARD2, users.userHIGH_CARD3]);
  expect(winners).toEqual([users.userHIGH_CARD1, users.userHIGH_CARD2, users.userHIGH_CARD3]);
});

test('equal HIGH_CARD with best rest card', () => {
  const winners = getWinner([
    users.userHIGH_CARD1,
    users.userHIGH_CARD2,
    users.userHIGH_CARD3,
    users.userHIGH_CARD4,
  ]);
  expect(winners).toEqual([users.userHIGH_CARD4]);
});

test('equal HIGH_CARD with best MAIN card', () => {
  const winners = getWinner([
    users.userHIGH_CARD1,
    users.userHIGH_CARD2,
    users.userHIGH_CARD3,
    users.userHIGH_CARD4,
    users.userHIGH_CARD5,
  ]);
  expect(winners).toEqual([users.userHIGH_CARD5]);
});

test('findBestArrayOfCards', () => {
  const result = findBestArrayOfCards(
    [
      [10, 7, 8],
      [14, 6, 2],
      [4, 2, 1],
    ],
    3,
    0
  );
  expect(result).toStrictEqual([14, 6, 2]);
});

test('findBestArrayOfCards', () => {
  const result = findBestArrayOfCards(
    [
      [14, 10, 7, 8],
      [14, 11, 6, 2],
      [10, 4, 2, 1],
    ],
    4,
    0
  );
  expect(result).toStrictEqual([14, 11, 6, 2]);
});

test('findBestArrayOfCards', () => {
  const result = findBestArrayOfCards(
    [
      [10, 1],
      [10, 6],
      [10, 4],
    ],
    2,
    0
  );
  expect(result).toStrictEqual([10, 6]);
});

test('findBestArrayOfCards', () => {
  const result = findBestArrayOfCards(
    [
      [10, 10, 4, 4],
      [13, 13, 6, 6],
      [4, 4, 3, 3],
    ],
    4,
    0
  );
  expect(result).toStrictEqual([13, 13, 6, 6]);
});

test('one pair with equal pairs', () => {
  const winners = getWinner([users.userONE_PAIR, users.userONE_PAIR2, users.userONE_PAIR3]);
  expect(winners).toEqual([users.userONE_PAIR2]);
});

test('THREE_KIND with equal best combination', () => {
  const winners = getWinner([users.userTHREE_KIND, users.userTHREE_KIND1]);
  expect(winners).toEqual([users.userTHREE_KIND1]);
});

test('THREE_KIND with one best combination', () => {
  const winners = getWinner([users.userTHREE_KIND, users.userTHREE_KIND1, users.userTHREE_KIND2]);
  expect(winners).toEqual([users.userTHREE_KIND2]);
});

test('TWO_PAIRS with best MAIN combination', () => {
  const winners = getWinner([users.userTWO_PAIRS1, users.userTWO_PAIRS2, users.userTWO_PAIRS3]);
  expect(winners).toEqual([users.userTWO_PAIRS2]);
});

test('TWO_PAIRS with best REST card', () => {
  const winners = getWinner([users.userTWO_PAIRS1, users.userTWO_PAIRS4, users.userTWO_PAIRS3]);
  expect(winners).toEqual([users.userTWO_PAIRS1]);
});
