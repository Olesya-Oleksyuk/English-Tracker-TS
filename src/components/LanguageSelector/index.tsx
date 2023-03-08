import React, { useContext } from 'react';

import { Language, languageOptions } from '../../multiLanguage/languages';
import { LanguageContext } from '../../multiLanguage/LanguageProvider';

const Index = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  // set selected language by calling context method
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.currentTarget.value as Language);
  };
  return (
    <select
      onChange={handleChangeLanguage}
      value={language === null ? 'en' : language}
    >
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Index;
