import { localStorageKey } from 'components/modal';

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(localStorageKey) as string);
};
export const setLocalStorage = (v: string) => {
  return localStorage.setItem(localStorageKey, v);
};
