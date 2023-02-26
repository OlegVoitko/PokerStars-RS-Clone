import React from 'react';

import { Suit } from '.';
import styled from '@emotion/styled';
import { ICard, IGameplay } from 'types/interfaces';
import { useAppSelector } from '../../hooks/hook';
import './RenderPlayer';

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

  &[data-suit='Diamond'],
  &[data-suit='Heart'] {
    color: red;
  }

  & .cardInfo {
    position: absolute;
    font-size: 21px;
    font-weight: 600;
    text-align: center;

    & img {
      height: 13px;
      width: 13px;
    }

    &.top {
      top: 1px;
      left: 4px;
    }

    &.bottom {
      bottom: 1px;
      right: 30px;
      transform: rotate(180deg);
    }
  }

  .cardSuit {
    position: absolute;
    top: 38px;
    left: 16px;
  }

  & .cardSuit img {
    height: 27px;
    width: 27px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CardProps {
  card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const { winners, stage } = useAppSelector((state: { gameplay: IGameplay }) => state.gameplay);
  console.log(winners);
  const winCards = winners
    .map((w) => [...w.gameState.bestCombination, ...w.gameState.restBestCards])
    .flat()
    .map((card) => JSON.stringify(card));

  return (
    <div
      className={`${
        winCards?.includes(JSON.stringify(card)) && (stage === 4 || stage === 999) ? 'win-card' : ''
      }`}
    >
      <CardWrapper data-suit={card.suit}>
        <span className='cardInfo top'>
          <div>{card.cardFace}</div>
          <Suit suit={card.suit} />
        </span>
        <div className='cardSuit'>
          <Suit suit={card.suit} />
        </div>
      </CardWrapper>
    </div>
  );
};
