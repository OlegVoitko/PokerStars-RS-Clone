import * as React from 'react';
import { Card } from '.';
import './RenderCards.scss';
import { ICard } from 'types/interfaces';

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
