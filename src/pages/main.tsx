import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { DropDown } from 'components/providers/DropDown';
import { GlobalPortal } from 'components/providers/GlobalPotal';
import { nowType, useSwapInput } from 'hooks/useSwapInput';
import { Suspense } from 'react';

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

const InputArray: nowType[] = ['first', 'second'];
MainPage.SwapInputs = () => {
  const {
    inputUsd,
    setNowState,
    state,
    changeInputState,
    changeState,
    nowState,
    inputState,
  } = useSwapInput();
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
