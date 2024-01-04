import { IgetQuoteParams } from 'apis';
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
MainPage.SwapInputs = () => {
  const [state, setState] = useState<TokenIdType>('axie-infinity');
  const { data } = useGetQuoteQuery(state);
  return <></>;
};
