import { useEffect, useMemo, useState } from 'react';
import { useForm } from './useForm';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getQuote } from 'apis';
import { TokenIdType } from 'constants/tokenList';

type stateType = {
  first: TokenIdType;
  second: TokenIdType;
};
type inputType = `${number}.${number}` | `${number}`;
export type nowType = keyof stateType;
type inputStateType = {
  first: inputType;
  second: inputType;
};
const initialInputState: inputStateType = {
  first: '0.0',
  second: '0.0',
} as const;
const initialState: stateType = {
  first: 'axie-infinity',
  second: 'aave',
} as const;
export const useSwapInput = () => {
  const [state, changeState] = useForm<stateType>(initialState);
  const [nowState, setNowState] = useState<nowType>('first');
  const [inputState, changeInputState] =
    useForm<inputStateType>(initialInputState);
  const [firstQuote, secondQuote] = useSuspenseQueries({
    queries: Object.keys(state).map((key) => {
      const ids = state[key as keyof stateType];
      return {
        queryKey: [ids],
        queryFn: () => getQuote(ids),
      };
    }),
  });
  const firstInputUsd = useMemo(
    () => parseInt(inputState.first) * firstQuote.data,
    [inputState.first, firstQuote.data],
  );
  const secondInputUsd = useMemo(
    () => parseInt(inputState.second) * secondQuote.data,
    [inputState.second, secondQuote.data],
  );
  const inputUsd = {
    first: firstInputUsd,
    second: secondInputUsd,
  };
  useEffect(() => {}, []);
  return {
    inputUsd,
    setNowState,
    state,
    changeInputState,
    changeState,
    nowState,
    inputState,
  };
};
