import { ComponentProps, ReactNode } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  typeBadge: ReactNode;
  usd: number;
}
export const Input = ({ typeBadge, usd, ...props }: InputProps) => {
  return (
    <div css={{ display: 'flex' }}>
      <div css={{ display: 'flex', flexDirection: 'column' }}>
        <input {...props} />
        <p>${usd}</p>
      </div>
      {typeBadge}
    </div>
  );
};
