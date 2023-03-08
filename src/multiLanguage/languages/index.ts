import ru from './ru.json';
import en from './en.json';
import { NestedKeysOf } from '../../helpers/types';

export type DictionaryData = {
  TITLE: string;
  NAVIGATION_TABS: {
    TASK_LIST: string;
    CHART: string;
  };
  CATEGORIES: {
    ALL: string;
    GRAMMAR: string;
    PRONUNCIATION: string;
    DRILLING: string;
    VOCABULARY: string;
    PHRASAL_VERBS: string;
    SLANG: string;
    ACADEMIC_WRITING: string;
  };
  CONTROL_PANEL: {
    INPUT_PLACEHOLDER: string;
    DROPDOWN_PLACEHOLDER: string;
    FILTER_STATUS: {
      ALL: string;
      UNCOMPLETED: string;
      COMPLETED: string;
    };
    NOTES_LEFT: string;
  };
  BUTTONS: {
    DEMO: string;
    CLEAR_CASH: string;
    CLEAR_COMPLETED: string;
  };
  CHART: {
    EMPTY_LIST_ALERT: string;
  };
};

export type DictionaryDataKeysWithText = {
  [Property in NestedKeysOf<DictionaryData>]: string;
};

export type DictionaryDataIds = keyof DictionaryDataKeysWithText;

export const dictionaryList = {
  en,
  ru,
};

export type Language = keyof typeof dictionaryList;

export const languageOptions = {
  ru: 'Русский',
  en: 'English',
};
