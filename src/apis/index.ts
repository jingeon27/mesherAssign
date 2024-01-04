import axios from 'axios';
import { TokenIdType } from '../constants/tokenList';

export interface IgetQuoteParams {
  ids: TokenIdType;
}

export const getQuote = async (params: IgetQuoteParams) => {
  const data = await axios({
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price',
    params,
  });
  return data.data[params.ids].usd;
};
