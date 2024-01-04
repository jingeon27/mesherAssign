import { ComponentProps, ReactNode } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  typeBadge: ReactNode;
  usd: string;
}
export const Input = ({ typeBadge, usd, ...props }: InputProps) => {
  return (
    <div css={{ display: 'flex' }}>
      <div css={{ display: 'flex' }}>
        <input {...props} />
        <p>${usd}</p>
      </div>
      {typeBadge}
    </div>
  );
};
