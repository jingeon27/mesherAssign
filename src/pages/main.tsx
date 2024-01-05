import { Svg } from 'assets';
import { Alert } from 'components/providers/alert';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { DropDown, useDropDownValue } from 'components/providers/DropDown';
import { GlobalPortal } from 'components/providers/GlobalPotal';
import { inputLabel } from 'constants/mainPageTest';
import { triggerBtn } from 'constants/modalTest';
import { nowType, useSwapInput } from 'hooks/useSwapInput';
import { Suspense } from 'react';
import { replaceUnderTen } from 'utils/replaceUnderTen';

export const MainPage = () => {
  return (
    <>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          css={{
            display: 'flex',
          }}
        >
          <h6>스왑</h6>
          <Alert.Trigger>
            <Svg.Setting
              css={{
                ':hover': {
                  background: 'gray',
                },
                cursor: 'pointer',
              }}
            />
          </Alert.Trigger>
        </div>
        <DropDown.Provider>
          <Suspense fallback={<></>}>
            <MainPage.SwapInputs />
          </Suspense>{' '}
        </DropDown.Provider>
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
    first,
    second,
  } = useSwapInput();
  const value = useDropDownValue();
  return (
    <>
      {InputArray.map((item) => (
        <Input
          key={item}
          typeBadge={
            <DropDown.Trigger
              onClick={() => {
                setNowState(item);
                console.log(value);
              }}
              data-testid={triggerBtn[item]}
            >
              {state[item]}
            </DropDown.Trigger>
          }
          usd={inputUsd[item]}
          value={inputState[item]}
          onBlur={() => {
            if (!inputState.first) {
              changeInputState(item)('0.0');
            }
          }}
          aria-label={inputLabel[item]}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^\d.]/g, '');
            e = replaceUnderTen(e);
            changeInputState('recentlyEdit')(item);
            changeInputState(item)(e);
          }}
        />
      ))}
      <p>
        1 {state.second} = {first / second} {state.first}{' '}
        <span>(${second})</span>
      </p>
      <Button
        isActive={Number(inputState.first) !== 0}
        activeBtn={
          <Alert.Trigger>
            <button
              css={{
                background: 'blue',
              }}
            >
              스왑
            </button>
          </Alert.Trigger>
        }
        disableBtn={
          <button css={{ background: 'gray' }}>금액을 입력하세요.</button>
        }
      />

      <DropDown.Content>
        <GlobalPortal.Consumer>
          <Modal changeState={changeState(nowState)} />{' '}
        </GlobalPortal.Consumer>
      </DropDown.Content>
    </>
  );
};
