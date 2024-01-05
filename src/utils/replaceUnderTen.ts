import { ChangeEvent } from 'react';

export const replaceUnderTen = (e: ChangeEvent<HTMLInputElement>) => {
  const arr = e.target.value.split('.');
  if (arr.length === 1) return e;
  e.target.value = `${arr[0]}.${arr[1].slice(0, 10)}`;
  return e;
};
