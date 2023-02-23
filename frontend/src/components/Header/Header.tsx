import React, { useState } from 'react';
import './Header.scss';
import { Languages } from '../../helper';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const lang = (event.target as HTMLButtonElement).value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className='header'>
      <Link to={'profile'}>Profile</Link>

      <div className='language'>
        {language === 'en' ? (
          <button
            className='language-option language-option_en'
            value={Languages[1].code}
            onClick={handleChangeLanguage}
          />
        ) : (
          <button
            className='language-option language-option_ru'
            value={Languages[0].code}
            onClick={handleChangeLanguage}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
