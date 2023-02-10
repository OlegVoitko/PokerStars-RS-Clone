import React, { useState } from 'react';
import './Header.scss';
import { Languages } from '../../helper';
import { useTranslation } from 'react-i18next';

const Header = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setLanguage(language);
    i18n.changeLanguage(value);
  };

  return (
    <div className='header'>
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
    </div>
  );
};

export default Header;
