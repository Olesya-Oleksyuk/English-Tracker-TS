import { SetStateAction, useState } from 'react';

const localStorageApp = 'app:englishTracker';
const saveToStorage = <T>({ key, value }: { key: string; value: T }) => {
  localStorage.setItem(`${localStorageApp}:${key}`, JSON.stringify(value));
};

/**
 * A hook to create Local Storage item
 *
 * @returns {boolean}
 * @param key - a string specifying the name of the key you want to set the value of
 * @param defaultValue - a string specifying the initial value of the key you want to set the value of
 * @returns {[state, setValue]} -  a tuple with the value and value setter for the local storage item
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T | (() => T)
) => {
  // 👇 Load stored state into regular react component state
  const [state, setState] = useState<T>(() => {
    const storedState = localStorage.getItem(`${localStorageApp}:${key}`);

    if (storedState) {
      // 🚩 Data is stored as string so need to parse
      return JSON.parse(storedState) as T;
    }

    // No stored state - save initial value to local storage.
    // It could be a function initializer or plain value.
    if (defaultValue instanceof Function) {
      saveToStorage({ key, value: defaultValue() });
    } else {
      saveToStorage({ key, value: defaultValue });
    }

    return defaultValue instanceof Function
      ? defaultValue()
      : (defaultValue as T);
  });

  // Keeps the exact same interface as setState - value or setter function.
  const setValue = (value: SetStateAction<T>) => {
    const valueToStore = value instanceof Function ? value(state) : value;
    localStorage.setItem(
      `${localStorageApp}:${key}`,
      JSON.stringify(valueToStore)
    );
    setState(valueToStore);
  };

  // as const tells TypeScript you want tuple type, not array.
  return [state, setValue] as const;
};
