import { ReactNode } from 'react';

export interface ButtonProps {
  isActive: boolean;
  activeBtn: ReactNode;
  disableBtn: ReactNode;
}
export const Button = ({ isActive, activeBtn, disableBtn }: ButtonProps) => {
  return <>{isActive ? activeBtn : disableBtn}</>;
};
