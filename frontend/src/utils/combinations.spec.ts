import { findBestCombination } from './gameHelper';
import * as data from './mockCombinations';
import { POKER_COMBINATIONS } from './constants';

test('nothing', () => {
  const { combinationRating } = findBestCombination(data.boardNothing, data.handNothing);
  expect(combinationRating).toBe(POKER_COMBINATIONS.HIGH_CARD);
});

test('straightFlush', () => {
  const { combinationRating } = findBestCombination(
    data.boardStraightFlush,
    data.handStraightFlush
  );
  expect(combinationRating).toBe(POKER_COMBINATIONS.STRAIGHT_FLUSH);
});

test('FOUR_KIND', () => {
  const { combinationRating } = findBestCombination(data.boardFour, data.handFour);
  expect(combinationRating).toBe(POKER_COMBINATIONS.FOUR_KIND);
});

test('FullHouse', () => {
  const { combinationRating, bestCombination } = findBestCombination(
    data.boardFullHouse,
    data.handFullHouse
  );
  console.log(bestCombination);
  expect(combinationRating).toBe(POKER_COMBINATIONS.FULL_HOUSE);
});

test('FullHouse with two pairs', () => {
  const { combinationRating, bestCombination } = findBestCombination(
    data.boardFullHouse2,
    data.handFullHouse2
  );
  console.log(bestCombination);
  expect(combinationRating).toBe(POKER_COMBINATIONS.FULL_HOUSE);
});

test('FullHouse with two pairs', () => {
  const { combinationRating, bestCombination } = findBestCombination(
    data.boardFullHouse2,
    data.handFullHouse2
  );
  console.log(bestCombination);
  expect(combinationRating).toBe(POKER_COMBINATIONS.FULL_HOUSE);
});

test('Street', () => {
  const { combinationRating } = findBestCombination(data.boardStreet, data.handStreet);
  expect(combinationRating).toBe(POKER_COMBINATIONS.STRAIGHT);
});

test('Three', () => {
  const { combinationRating } = findBestCombination(data.boardThree, data.handThree);
  expect(combinationRating).toBe(POKER_COMBINATIONS.THREE_KIND);
});

test('TwoPairs', () => {
  const { combinationRating } = findBestCombination(data.boardTwoPairs, data.handTwoPairs);
  expect(combinationRating).toBe(POKER_COMBINATIONS.TWO_PAIRS);
});

test('pair', () => {
  const { combinationRating } = findBestCombination(data.boardPair, data.handPair);
  expect(combinationRating).toBe(POKER_COMBINATIONS.ONE_PAIR);
});

test('pair', () => {
  const { combinationRating } = findBestCombination(data.boardQ, data.handQ);
  expect(combinationRating).toBe(POKER_COMBINATIONS.ONE_PAIR);
});
