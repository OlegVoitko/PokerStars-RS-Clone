import { ICard } from '../../../types/interfaces';

export interface IPlayer {
  id: string;
  hand: ICard[];
  stack: number;
}

export interface IHand {
  playersInDial: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
}

export const deal = (count: number, deck: ICard[]) => {
  let currentCard = 0;
  const hands = Array(count);
  for (let i = 0; i < count; i += 1) {
    hands[i] = [deck[currentCard], deck[currentCard + 1]];
    currentCard += 2;
  }
  return hands;
};
