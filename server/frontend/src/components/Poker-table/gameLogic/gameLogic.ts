import { ICard } from '../../Cards/Card';

export interface IPlayer {
  id: string;
  hand: ICard[];
  stack: number;
}

export interface IGamePlay {
  playersInDial: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
}

export const deal = (players: IPlayer[], deck: ICard[]) => {
  let currentCard = 0;
  const copy = { ...players };
  for (let i = 0; i < players.length; i += 1) {
    console.log(copy[i]);
    console.log(deck);
    copy[i].hand.push(deck[currentCard], deck[currentCard + 1]);
    currentCard += 2;
  }
  return copy;
};
