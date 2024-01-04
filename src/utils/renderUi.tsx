import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Providers } from '../App';

type Route = `/${string}`;

export function wrapper(
  { children }: { children: ReactNode },
  options?: { route: Route },
) {
  return (
    <Providers>
      <MemoryRouter initialEntries={[options?.route ?? '/']}>
        {children}
      </MemoryRouter>
    </Providers>
  );
}
