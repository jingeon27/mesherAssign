import { useSuspenseQueries } from '@tanstack/react-query';
import { IgetQuoteParams, getQuote } from 'apis';
import { DropDown } from 'components/providers/DropDown';
import { TokenIdType } from 'constants/tokenList';
import { useGetQuoteQuery } from 'hooks/useGetQuoteQuery';
import { Suspense, useState } from 'react';

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
const initialState: stateType = {
  first: 'axie-infinity',
  second: 'aave',
} as const;

MainPage.SwapInputs = () => {
  const [state, setState] = useState<stateType>(initialState);
  const [firstQuote, secondQuote] = useSuspenseQueries({
    queries: Object.keys(state).map((key) => {
      const ids = state[key as keyof stateType];
      return {
        queryKey: [ids],
        queryFn: () => getQuote({ ids }),
      };
    }),
  });
  return <></>;
};
