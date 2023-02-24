import { Link } from 'react-router-dom';
import { useAppSelector } from 'hooks/hook';
import { IUser } from 'types/interfaces';
import './style.scss';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user) as IUser;
  return (
    <section className='container profile'>
      <h1 className='profile__title'>PLAYER PROFILE</h1>
      <div className='profile__wrap'>
        <div className='profile__avatar'></div>
        <h2 className='profile__nick'>Nickname: {user.nickname}</h2>
        <div className='profile__bankroll'>Bankroll: {user.bankroll}$</div>
      </div>

      <Link className='profile__link' to={'/table'}>
        Go to the Table
      </Link>
    </section>
  );
};

export default ProfilePage;
