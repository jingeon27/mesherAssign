import { useSuspenseQueries } from '@tanstack/react-query';
import { getQuote } from 'apis';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { DropDown } from 'components/providers/DropDown';
import { GlobalPortal } from 'components/providers/GlobalPotal';
import { TokenIdType } from 'constants/tokenList';
import { useForm } from 'hooks/useForm';
import { Suspense, useEffect, useMemo, useState } from 'react';

export const MainPage = () => {
  return (
    <>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Suspense fallback={<></>}>
          <MainPage.SwapInputs />
        </Suspense>
      </div>
    </>
  );
};
type stateType = {
  first: TokenIdType;
  second: TokenIdType;
};
type inputType = `${number}.${number}` | `${number}`;
type nowType = keyof stateType;
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
const InputArray: nowType[] = ['first', 'second'];
MainPage.SwapInputs = () => {
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
  return (
    <>
      <DropDown.Provider>
        {InputArray.map((item) => (
          <Input
            typeBadge={
              <DropDown.Trigger
                onClick={() => {
                  setNowState(item);
                }}
              >
                {state[item]}
              </DropDown.Trigger>
            }
            usd={inputUsd[item]}
            value={inputState.first}
            onBlur={() => {
              if (!inputState.first) {
                changeInputState(item)('0.0');
              }
            }}
            onChange={changeInputState(item)}
          />
        ))}
        <p></p>
        <DropDown.Consumer>
          <GlobalPortal.Consumer>
            <Modal changeState={changeState(nowState)} />
          </GlobalPortal.Consumer>
        </DropDown.Consumer>
      </DropDown.Provider>
    </>
  );
};
