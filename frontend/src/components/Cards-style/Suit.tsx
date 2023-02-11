import * as React from 'react';
import { CardSuit } from './interfaces/Poker';
import Hearts from '../../assets/cards/Hearts.svg';
import Diamonds from '../../assets/cards/Diamonds.svg';
import Clubs from '../../assets/cards/Clubs.svg';
import Spades from '../../assets/cards/Spades.svg';

interface SuitProps {
  suit: CardSuit;
}

export const Suit: React.FC<SuitProps> = ({ suit }) => {
  const imageSrc = React.useMemo(() => {
    if (suit === 'hearts') return Hearts;
    if (suit === 'diamonds') return Diamonds;
    if (suit === 'clubs') return Clubs;
    if (suit === 'spades') return Spades;

    return undefined;
  }, [suit]);

  return <img src={imageSrc} alt='icon' />;
};
