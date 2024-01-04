import { IgetQuoteParams, getQuote } from '../apis';

export const mockGetQuote = () => {
  const getQuoteMock = getQuote as jest.Mock;
  getQuoteMock.mockReturnValue(({ ids }: IgetQuoteParams) => ({
    [ids]: { usd: 1419.89 },
  }));
};
