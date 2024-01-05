import { ChangeEvent, useState } from 'react';

export type ChangeStateType<T> = (
  v: keyof T,
) => (e: ChangeEvent<HTMLInputElement> | string) => void;
export const useForm = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);
  const changeState: ChangeStateType<T> = (v) => (e) => {
    setState((prev) => ({
      ...prev,
      [v]: typeof e === 'string' ? e : e.target.value,
    }));
  };
  return [state, changeState] as const;
};
