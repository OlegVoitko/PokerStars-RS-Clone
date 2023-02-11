import React from 'react';

import { Card as ICard } from './interfaces/Poker';
import { Suit } from '../Cards-style';
import styled from '@emotion/styled';

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 43px;
  height: 68px;

  transition: all 0.2s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);

  color: #000;
  user-select: none;

  &[data-suit='diamonds'],
  &[data-suit='hearts'] {
    color: red;
  }

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.12);
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }

  & .cardInfo {
    position: absolute;
    font-size: 12px;
    font-weight: 600;
    text-align: center;

    & img {
      height: 10px;
      width: 10px;
    }

    &.top {
      top: 1px;
      left: 30px;
    }

    &.bottom {
      bottom: 1px;
      right: 30px;
      transform: rotate(180deg);
    }
  }

  & .cardSuit img {
    height: 16px;
    width: 16px;
  }

  &[data-highlight='true'] {
    box-shadow: 0 0 1px 3px rgb(255, 8, 75);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CardProps {
  card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const title = React.useMemo(() => {
    if (
      card.value === 'Jack' ||
      card.value === 'Queen' ||
      card.value === 'King' ||
      card.value === 'Ace'
    ) {
      return card.value[0];
    }
    return card.value;
  }, [card.value]);

  return (
    <>
      <CardWrapper>
        <span className='cardInfo top'>
          <div>{title}</div>
          <Suit suit={card.suit} />
        </span>
        <div className='cardSuit'>
          <Suit suit={card.suit} />
        </div>
        {/* <span className='cardInfo bottom'>
          <div>{title}</div>
          <Suit suit={card.suit} />
        </span> */}
      </CardWrapper>
    </>
  );
};
