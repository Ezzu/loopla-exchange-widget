export const buildExchangeRatesCacheKey = (baseCurrency: string): string => {
  return `rates-${baseCurrency}`;
};
