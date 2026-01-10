export const formatCurrencyRate = (rate: number, decimals: number = 4): string => {
  return rate.toFixed(decimals);
};

export const formatPercentageChange = (change: number): string => {
  const sign = change > 0 ? '+' : '';

  return `${sign}${change.toFixed(2)}%`;
};

export const getChangeIndicator = (change?: number): string => {
  if (!change) return '→';

  return change > 0 ? '↑' : change < 0 ? '↓' : '→';
};

export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CHF: 'Fr',
    AUD: 'A$',
    CAD: 'C$',
  };

  return symbols[currency] || currency;
};
