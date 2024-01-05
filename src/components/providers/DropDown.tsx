import {
  ComponentProps,
  ComponentPropsWithRef,
  PropsWithChildren,
  forwardRef,
  useState,
} from 'react';

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
export const Consumer = ({ children }: PropsWithChildren) => {
  const value = useDropDownValue();
  return value ? <>{children}</> : <></>;
};
export const Cancel = ({ onClick, ...props }: ComponentProps<'button'>) => {
  const action = useDropDownAction();
  return (
    <button
      {...props}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        action(false);
      }}
    />
  );
};
export const Trigger = forwardRef(
  ({ onClick, ...props }: ComponentPropsWithRef<'button'>) => {
    const action = useDropDownAction();
    return (
      <button
        {...props}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
          action(false);
        }}
      />
    );
  },
);
export const DropDown = {
  Provider,
  Trigger,
  Consumer,
  Cancel,
};
