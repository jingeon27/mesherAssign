import axios from 'axios';
import { TokenIdType } from '../constants/tokenList';

export const getQuote = async (ids: TokenIdType) => {
  const data = await axios({
    method: 'get',
    url: 'https://api.coingecko.com/api/v3/simple/price',
    params: { ids, vs_currencies: 'USD' },
  });
  return data.data[ids].usd;
};
