import { getWinner } from './gameHelper';
import * as users from './mockWinner';

test('winnerFlush', () => {
  const winner = getWinner([users.userFLUSH, users.userONE_PAIR, users.userFLUSH2]);
  expect(winner).toBe(users.userFLUSH2);
});

test('winner Same Combinations On Table', () => {
  const winners = getWinner([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS]);
  expect(winners).toEqual([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS]);
});

test('winner Same Combinations On Table with different suits but equal nums', () => {
  const winners = getWinner([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS, users.user3TWO_PAIRS, users.user4TWO_PAIRS]);
  expect(winners).toEqual([users.userTWO_PAIRS, users.user1TWO_PAIRS, users.user2TWO_PAIRS, users.user3TWO_PAIRS, users.user4TWO_PAIRS]);
});

test('four kind with same four', () => {
  const winners = getWinner([users.userFOUR_KIND, users.userFOUR_KIND2, users.userFOUR_KIND3]);
  expect(winners).toEqual([users.userFOUR_KIND]);
});

test('four kind with different four', () => {
  const winners = getWinner([users.userFOUR_KIND4, users.userFOUR_KIND3]);
  expect(winners).toEqual([users.userFOUR_KIND3]);
});
