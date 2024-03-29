export const tokenList = {
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  DAI: 'dai',
  AAVE: 'aave',
  WBTC: 'bitcoin',
  AXS: 'axie-infinity',
  COMP: 'compound-coin',
  CRV: 'curve-dao-token',
  ENS: 'ethereum-name-service',
} as const;

export type TokenListKeyType = keyof typeof tokenList;
export type TokenIdType = (typeof tokenList)[TokenListKeyType];
