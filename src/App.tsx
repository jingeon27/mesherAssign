import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Alert } from 'components/providers/alert';
import { GlobalPortal } from 'components/providers/GlobalPotal';
import { MainPage } from 'pages/main';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalPortal.Provider>
          <Alert.Provider>
            {children}
            <Alert.Consumer />
          </Alert.Provider>
          <ReactQueryDevtools initialIsOpen={true} />
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </>
  );
};

function App() {
  return (
    <Providers>
      <MainPage />
    </Providers>
  );
}

export default App;
