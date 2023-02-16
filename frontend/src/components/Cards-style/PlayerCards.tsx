import styled from '@emotion/styled';
import * as React from 'react';
import { IUser } from 'types/interfaces';
import { Suit } from './Suit';
import { useAppSelector } from '../../hooks/hook';
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

const imageAvatarUsers: string[] = [
  'bug.png',
  'congrats.png',
  'deadline.png',
  'expert.png',
  'finished.png',
  'mentor.png',
  'without_mentor.png',
  'works.png',
  'writing.png',
  'wtf.png',
];

// const img = (array: string | any[]) => {
//   const randomNum = Math.floor(Math.random() * array.length);
//   return array[randomNum];
// };

export const RenderPlayer: React.FC<PlayersProps> = ({ users }) => {
  const user = useAppSelector((state) => state.user.user) as IUser;
  return (
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
                  {/* {user._id === u._id && (<Suit suit={u.gameState.hand[1].suit} />)} */}
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
              src={`${require('../../assets/avatar/mentor.png')}`}
              alt='Avatar'
            />
          </div>
          <h4 className='player-name'>{u.nickname}</h4>
          <h4 className='player-stack'>$ {u.gameState.stack}</h4>
        </div>
      ))}
    </>
  );
};
