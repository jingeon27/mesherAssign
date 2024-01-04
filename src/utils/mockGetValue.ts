import { IgetQuoteParams, getQuote } from '../apis';

export const mockGetQuote = () => {
  const getQuoteMock = getQuote as jest.Mock;
  getQuoteMock.mockReturnValue(({ vs_currencies, ids }: IgetQuoteParams) => ({
    [ids]: { [vs_currencies]: 1419.89 },
  }));
};
