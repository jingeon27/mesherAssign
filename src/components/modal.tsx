import { tokenList } from 'constants/tokenList';
import { DropDown } from './providers/DropDown';
import { modalInputPlaceHolder } from 'constants/modalTest';
import { Alert } from './providers/alert';

export interface modalProps {
  changeState: (e: string) => void;
}
export const Modal = (props: modalProps) => {
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
          <Modal.Header {...props} />
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {' '}
            <Modal.Content {...props} />
            <Modal.Footer />
          </div>
        </div>
      </div>
    </>
  );
};
Modal.Header = ({ changeState }: modalProps) => {
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
      <input placeholder={modalInputPlaceHolder} />
      <div css={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {Object.keys(tokenList).map((token) => (
          <DropDown.Cancel key={token} onClick={() => changeState(token)}>
            {token}
          </DropDown.Cancel>
        ))}
      </div>
    </div>
  );
};
Modal.Content = ({ changeState }: modalProps) => {
  return (
    <div
      css={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
      }}
    >
      {Object.keys(tokenList).map((token) => (
        <DropDown.Cancel
          key={token}
          onClick={() => changeState(token)}
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
