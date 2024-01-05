import { ComponentProps, PropsWithChildren, useState } from 'react';

import { createContext, useContext } from 'react';

export type DropDownActionType = (action: boolean) => void;
export const DropDownValueContext = createContext<boolean | undefined>(
  undefined,
);
export const DropDownActionContext = createContext<
  DropDownActionType | undefined
>(undefined);

export const useDropDownAction = () => {
  const actions = useContext(DropDownActionContext);
  if (actions === undefined) {
    throw new Error('action error');
  }
  return actions;
};

export const useDropDownValue = () => {
  const value = useContext(DropDownValueContext);
  if (value === undefined) {
    throw new Error('value error');
  }
  return value;
};
const Provider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<boolean>(false);

  const changeState: DropDownActionType = (change) => {
    setState(change);
  };

  return (
    <>
      <DropDownActionContext.Provider value={changeState}>
        <DropDownValueContext.Provider value={state}>
          {children}
        </DropDownValueContext.Provider>
      </DropDownActionContext.Provider>
    </>
  );
};
export const Content = ({ children }: PropsWithChildren) => (
  <>
    <DropDownValueContext.Consumer>
      {(value) => (value ? children : null)}
    </DropDownValueContext.Consumer>
  </>
);
interface ButtonProps extends ComponentProps<'button'> {
  'data-testid'?: string;
}
export const Cancel = ({ onClick, ...props }: ButtonProps) => {
  return (
    <DropDownActionContext.Consumer>
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
    </DropDownActionContext.Consumer>
  );
};
export const Trigger = ({ onClick, ...props }: ButtonProps) => {
  return (
    <DropDownActionContext.Consumer>
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
    </DropDownActionContext.Consumer>
  );
};
export const DropDown = {
  Provider,
  Trigger,
  Content,
  Cancel,
};
