import React, { createContext, useContext, useState } from 'react';
import get from 'lodash.get';
import {
  DictionaryData,
  DictionaryDataIds,
  DictionaryDataKeysWithText,
  dictionaryList,
  Language,
  languageOptions,
} from './languages';
import { CallbackDefault, EmptyObject } from '../helpers/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ILanguageContext = {
  language: Language | null;
  changeLanguage: (selected: Language) => void | CallbackDefault;
  dictionary: DictionaryData | DictionaryDataKeysWithText | EmptyObject;
};

const LanguageContextInitial: ILanguageContext = {
  language: null,
  changeLanguage: () => undefined,
  dictionary: {},
};

// LanguageContext
// create the language context with default selected language
export const LanguageContext = createContext<ILanguageContext>(
  LanguageContextInitial
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // create local storage to preserve user language preference
  const [currentLang, setCurrentLang] = useLocalStorage<Language>('lang', 'ru');

  const [language, setLanguage] = useState<Language>(currentLang);
  const [dictionary, setDictionary] = useState<DictionaryData>(
    dictionaryList[language]
  );

  const provider = {
    language,
    dictionary,
    changeLanguage: (selected: Language) => {
      const newLanguage = languageOptions[selected] ? selected : 'ru';
      setLanguage(newLanguage);
      setDictionary(dictionaryList[newLanguage]);
      setCurrentLang(newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}

// get JSX with text according to id & current language
export const Text = ({ textId }: { textId: DictionaryDataIds }) => {
  const { dictionary } = useContext(LanguageContext);
  return <>{get(dictionary, textId) || textId}</>;
};

// get plain text according to id & current language
export const getText = (textId: DictionaryDataIds) => {
  const { dictionary } = useContext(LanguageContext);
  return get(dictionary, textId) || textId;
};
