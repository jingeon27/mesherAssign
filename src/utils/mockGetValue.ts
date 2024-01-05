import { getQuote } from 'apis';
import { TokenIdType } from 'constants/tokenList';

export const mockGetQuote = () => {
  const getQuoteMock = getQuote as jest.Mock;
  getQuoteMock.mockResolvedValue((ids: TokenIdType) => {
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
