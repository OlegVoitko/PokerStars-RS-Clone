import styled from '@emotion/styled';
import * as React from 'react';
import { IUser } from 'types/interfaces';
import { Suit } from './Suit';

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
    top: 36px;
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

interface PlayersProps {
  users: IUser[];
}

export const RenderPlayer: React.FC<PlayersProps> = ({ users }) => (
  <>
    {users.map((u, i) => (
      <div className={`${'player'} ${'p' + [i]}`} key={i}>
        <div className='player-two-cards'>
          <div className='playing-card1'>
            <CardWrapper data-suit={u.gameState.hand[0].suit}>
              <span className='cardInfo top'>
                <div>{u.gameState.hand[0].cardFace}</div>
                <Suit suit={u.gameState.hand[0].suit} />
              </span>
              <div className='cardSuit'>
                <Suit suit={u.gameState.hand[0].suit} />
              </div>
            </CardWrapper>
          </div>
          <div className='playing-card2'>
            <CardWrapper data-suit={u.gameState.hand[1].suit}>
              <span className='cardInfo top'>
                <div>{u.gameState.hand[1].cardFace}</div>
                <Suit suit={u.gameState.hand[1].suit} />
              </span>
              <div className='cardSuit'>
                <Suit suit={u.gameState.hand[1].suit} />
              </div>
            </CardWrapper>
          </div>
        </div>
        <div className='player-avatar-container'>
          <img
            className='player-avatar_img'
            src={require('../../assets/deadline.png')}
            alt='Avatar'
          />
        </div>
        <h4 className='player-name'>Oleg</h4>
        <h4 className='player-stack'>$ {u.gameState.stack}</h4>
      </div>
    ))}
  </>
);
