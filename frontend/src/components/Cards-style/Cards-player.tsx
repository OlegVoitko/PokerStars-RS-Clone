import * as React from 'react';
import './Card-player.scss';

const renderUnicodeSuitSymbol = (suit: any) => {
  switch (suit) {
    case 'Heart':
      return '\u2665';
    case 'Diamond':
      return '\u2666';
    case 'Spade':
      return '\u2660';
    case 'Club':
      return '\u2663';
    default:
      throw Error('Unfamiliar String Recieved in Suit Unicode Generation');
  }
};

const Card = (props: {
  cardData: { suit: any; cardFace: any; animationDelay: any };
  applyFoldedClassname: any;
}) => {
  const {
    cardData: { suit, cardFace, animationDelay },
    applyFoldedClassname,
  } = props;
  return (
    <div
      key={`${suit} ${cardFace}`}
      className={`playing-card cardIn ${applyFoldedClassname ? ' folded' : ''}`}
      style={{ animationDelay: `${applyFoldedClassname ? 0 : animationDelay}ms` }}
    >
      <h6 style={{ color: `${suit === 'Diamond' || suit === 'Heart' ? 'red' : 'black'}` }}>
        {`${cardFace} ${renderUnicodeSuitSymbol(suit)}`}
      </h6>
    </div>
  );
};

export default Card;
