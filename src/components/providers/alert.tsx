import {
  Children,
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useState,
} from 'react';

import { createContext } from 'react';
import { GlobalPortal } from './GlobalPotal';
import { alertMent } from 'constants/alertMent';

export type AlertActionType = (action: boolean) => void;
export const AlertValueContext = createContext<boolean | undefined>(undefined);
export const AlertActionContext = createContext<AlertActionType | undefined>(
  undefined,
);

const Provider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<boolean>(false);

  const changeState: AlertActionType = (change) => {
    setState(change);
  };

  return (
    <>
      <AlertActionContext.Provider value={changeState}>
        <AlertValueContext.Provider value={state}>
          {children}
        </AlertValueContext.Provider>
      </AlertActionContext.Provider>
    </>
  );
};
export const Consumer = () => (
  <>
    <AlertValueContext.Consumer>
      {(value) =>
        value ? (
          <GlobalPortal.Consumer>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: '0px',
              }}
            >
              <div>{alertMent}</div>
              <Alert.Cancel>확인</Alert.Cancel>
            </div>
          </GlobalPortal.Consumer>
        ) : null
      }
    </AlertValueContext.Consumer>
  </>
);
interface ButtonProps extends ComponentProps<'button'> {
  'data-testid'?: string;
}
export const Cancel = ({ onClick, ...props }: ButtonProps) => {
  return (
    <AlertActionContext.Consumer>
      {(action) => (
        <button
          {...props}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
            if (action) {
              action(false);
            }
          }}
        />
      )}
    </AlertActionContext.Consumer>
  );
};
export const Trigger = ({ children }: { children: ReactElement }) => {
  const child = Children.only(children);
  return (
    <AlertActionContext.Consumer>
      {(action) =>
        cloneElement(child, {
          onClick: (...args: any) => {
            if (action) {
              action(true);
            }
            if (child.props && typeof child.props.onClick === 'function') {
              return child.props.onClick(...args);
            }
          },
        })
      }
    </AlertActionContext.Consumer>
  );
};
export const Alert = {
  Provider,
  Trigger,
  Consumer,
  Cancel,
};
