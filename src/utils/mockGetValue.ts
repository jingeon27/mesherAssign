import { IgetQuoteParams, getQuote } from '../apis';

export const mockGetQuote = () => {
  const getQuoteMock = getQuote as jest.Mock;
  getQuoteMock.mockReturnValue(({ ids }: IgetQuoteParams) => {
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
