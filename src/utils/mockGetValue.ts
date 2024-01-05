import { getQuote } from 'apis';
import { TokenIdType } from 'constants/tokenList';

export const mockGetQuote = () => {
  const getQuoteMock = getQuote as jest.Mock;
  getQuoteMock.mockReturnValue((ids: TokenIdType) => {
    if (ids === 'axie-infinity') {
      return {
        [ids]: { usd: 1000 },
      };
    }
    return {
      [ids]: { usd: 10 },
    };
  });
};
