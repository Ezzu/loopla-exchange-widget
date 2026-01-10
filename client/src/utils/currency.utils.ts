import { CURRENCIES, type CurrencyCode } from 'constants';

export const getCurrencyFlag = (currency: string): string => {
  return currency in CURRENCIES ? CURRENCIES[currency as CurrencyCode].flag : '';
};

export const formatCurrencyRate = (rate: number, decimals: number = 4): string => {
  return rate.toFixed(decimals);
};

export const getCurrencySymbol = (currency: string): string => {
  // Check if it's a known currency code
  if (currency in CURRENCIES) {
    return CURRENCIES[currency as CurrencyCode].symbol;
  }

  // Fallback to currency code if unknown
  return currency;
};
