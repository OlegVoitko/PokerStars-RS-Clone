import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Auth from '../components/Auth/Auth';
import { useTranslation } from 'react-i18next';
import { Languages } from '../helper';
import './StartPage.scss';
// import {PlayerState} from "../store/playerSlice";
import { RootState } from '../store/store';

const StartPage: FC = () => {
  const isUserAuth = useSelector((state: RootState) => state.player.isAuth);
  console.log('check slice', isUserAuth);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setLanguage(language);
    i18n.changeLanguage(value);
    console.log('handleChangeLanguage', value);
  };

  return (
    <div className='start-page-container'>
      <select className='language' onChange={handleChangeLanguage}>
        {/*style={{ backgroundImage: `url(${Languages.filter((l: Language) => l.code === language)[0].img})`}}*/}
        {Languages.map((lang) => {
          return (
            <option key={lang.code} value={lang.code} className='language-option'>
              {lang.code}
            </option>
          );
        })}
      </select>

      <h1 className='app-title'>
        <span className='char1'>p</span>
        <span className='char2'>o</span>
        <span className='char3'>k</span>
        <span className='char4'>e</span>
        <span className='char5'>r</span>
        <span className='char6'> </span>
        <span className='char7'>s</span>
        <span className='char8'>t</span>
        <span className='char9'>a</span>
        <span className='char10'>r</span>
        <span className='char11'>s</span>
      </h1>
      <Auth />
    </div>
  );
};

export default StartPage;
