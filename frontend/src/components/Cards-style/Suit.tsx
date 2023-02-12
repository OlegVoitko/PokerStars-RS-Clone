import * as React from 'react';
import Hearts from '../../assets/cards/Hearts.svg';
import Diamonds from '../../assets/cards/Diamonds.svg';
import Clubs from '../../assets/cards/Clubs.svg';
import Spades from '../../assets/cards/Spades.svg';

interface SuitProps {
  suit: string;
}

export const Suit: React.FC<SuitProps> = ({ suit }) => {
  const imageSrc = React.useMemo(() => {
    if (suit === 'Heart') return Hearts;
    if (suit === 'Diamond') return Diamonds;
    if (suit === 'Club') return Clubs;
    if (suit === 'Spade') return Spades;

    return undefined;
  }, [suit]);

  return <img src={imageSrc} alt='icon' />;
};
