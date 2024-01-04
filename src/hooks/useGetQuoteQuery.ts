import { useSuspenseQuery } from '@tanstack/react-query';
import { getQuote } from 'apis';
import { TokenIdType } from 'constants/tokenList';

export const useGetQuoteQuery = (ids: TokenIdType) => {
  return useSuspenseQuery({
    queryKey: [ids],
    queryFn: () => getQuote({ ids }),
  });
};
