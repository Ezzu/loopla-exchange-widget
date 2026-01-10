const CURRENCIES = {
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
};

export default CURRENCIES;

export type CurrencyCode = keyof typeof CURRENCIES;

export const CURRENCY_LIST = Object.values(CURRENCIES);

export const DEFAULT_TARGET_CURRENCY: CurrencyCode = 'EUR';

export const SOURCE_CURRENCIES: CurrencyCode[] = ['GBP', 'USD', 'CHF', 'AUD', 'CAD'];

// Refresh interval in milliseconds (2 minute)
export const REFRESH_INTERVAL = 120000;
