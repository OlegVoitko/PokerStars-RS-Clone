import * as React from 'react';
import { Card } from '../Cards-style';
import { Card as ICard } from './interfaces/Poker';
import './CardList.scss';

interface CardsListProps {
  cards: ICard[];
}

export const RenderCards: React.FC<CardsListProps> = ({ cards }) => (
  <div className='wrapper'>
    <ul>
      {cards.map((card, i) => (
        <li key={i}>
          <Card card={card} />
        </li>
      ))}
    </ul>
  </div>
);
