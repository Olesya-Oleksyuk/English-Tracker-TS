export const taskCategory = {
  ALL: 'ALL',
  GRAMMAR: 'GRAMMAR',
  PRONUNCIATION: 'PRONUNCIATION',
  DRILLING: 'DRILLING',
  VOCABULARY: 'VOCABULARY',
  PHRASAL_VERBS: 'PHRASAL VERBS',
  SLANG: 'SLANG',
  ACADEMIC_WRITING: 'ACADEMIC WRITING',
} as const;

export const taskCategoryRu = {
  ALL: 'ВСЁ',
  GRAMMAR: 'ГРАММАТИКА',
  PRONUNCIATION: 'ПРОИЗНОШЕНИЕ',
  DRILLING: 'ДРИЛЛИНГ',
  VOCABULARY: 'ВОКАБУЛЯР',
  PHRASAL_VERBS: 'ФРАЗОВЫЕ ГЛАГОЛЫ',
  SLANG: 'СЛЭНГ',
  ACADEMIC_WRITING: 'АКАДЕМИЧЕСКОЕ ПИСЬМО',
};

export const dropdownPlaceholder = 'Choose task category';

type CategoryEng = keyof typeof taskCategoryRu;
type CategoryRu = (typeof taskCategoryRu)[CategoryEng];

const isCategory = (value: string): value is CategoryEng =>
  Object.keys(taskCategoryRu).includes(value);

export const RuCategory = (str: string): CategoryRu | string => {
  if (isCategory(str)) {
    return taskCategoryRu[str];
  }
  return 'категория';
};
