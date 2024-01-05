import { TokenIdType, tokenList } from 'constants/tokenList';
import { DropDown } from './providers/DropDown';
import { modalInputPlaceHolder } from 'constants/modalTest';
import { Alert } from './providers/alert';
import { ComponentProps, useMemo, useState } from 'react';
import { getLocalStorage, setLocalStorage } from 'utils/localStorage';

export interface modalProps {
  changeState: (e: TokenIdType) => void;
}
export const localStorageKey = 'localstrage';
const CustomChangeState =
  (params: (e: TokenIdType) => void) => (value: TokenIdType) => {
    let arr = getLocalStorage();
    if (arr.length === 7) {
      const index = arr.indexOf(value);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      arr.push(value);
    }
    if (arr.length > 7) {
      arr = arr.slice(1, 8);
    }
    setLocalStorage(JSON.stringify(arr));
    return params(value);
  };
export const Modal = (props: modalProps) => {
  const [state, setState] = useState<string>('');
  return (
    <>
      <div
        css={{
          position: 'fixed',
          top: '0px',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          css={{
            position: 'relative',
            background: 'black',
            width: '400px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Modal.Header
            {...props}
            value={state}
            onChange={() => {
              setState(state);
            }}
          />
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {' '}
            <Modal.Content {...props} state={state} />
            <Modal.Footer />
          </div>
        </div>
      </div>
    </>
  );
};
Modal.Header = ({
  changeState,
  ...props
}: modalProps & ComponentProps<'input'>) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        gap: '5px',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h6 css={{ color: 'white' }}>토큰 선택</h6>
        <DropDown.Cancel>X</DropDown.Cancel>
      </div>
      <input placeholder={modalInputPlaceHolder} {...props} />
      <div css={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {getLocalStorage().map((token: any) => (
          <DropDown.Cancel
            key={token}
            onClick={() => CustomChangeState(changeState)(token)}
          >
            {token}
          </DropDown.Cancel>
        ))}
      </div>
    </div>
  );
};
Modal.Content = ({ changeState, state }: modalProps & { state: string }) => {
  const tokenListKeys = Object.keys(tokenList);
  const arr = useMemo(
    () => tokenListKeys.filter((e) => state.includes(e)),
    [tokenListKeys],
  );
  return (
    <div
      css={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
      }}
    >
      {arr.map((token) => (
        <DropDown.Cancel
          key={token}
          onClick={() => CustomChangeState(changeState)(token as TokenIdType)}
          css={{ height: '300px' }}
        >
          {token}
        </DropDown.Cancel>
      ))}
    </div>
  );
};
Modal.Footer = () => {
  return (
    <Alert.Trigger>
      <button css={{ width: '100%' }}>토큰 목록 관리</button>
    </Alert.Trigger>
  );
};
