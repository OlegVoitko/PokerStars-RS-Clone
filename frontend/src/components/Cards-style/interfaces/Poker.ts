export type CardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'Jack'
  | 'Queen'
  | 'King'
  | 'Ace';

export const CardValueArray: CardValue[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace',
];

export type CardSuit = 'clubs' | 'diamonds' | 'hearts' | 'spades';

export interface Card {
  cardFace: string;
  value: CardValue;
  suit: CardSuit;
  groups?: string[];
}

export interface Combination {
  id: number;
  cards: Card[];
}

export interface Combinations {
  combinations?: Map<CardValue, Combination>;
  highestCard?: CardValue;
  score?: number;
}

export interface Player extends Combinations {
  id: number;
  name: string;
  cards: Card[];
  isWon: boolean;
}
