export const en = {
  // App
  'app.title': 'Loopla Exchange Widget',
  'app.subtitle': 'Real-time currency exchange rates',
  'app.footer': 'Powered by Exchange Rates API',

  // Exchange Rates
  'exchangeRates.title': 'Exchange Rates',
  'exchangeRates.convertTo': 'Convert to:',
  'exchangeRates.lastUpdated': 'Last updated: {time}',
  'exchangeRates.refreshButton': 'Refresh Rates',
  'exchangeRates.noRates': 'No exchange rates available',

  // Currency
  'currency.rate': '1 {currency} =',

  // Errors
  'error.failedToFetch': 'Failed to fetch exchange rates',
  'error.tryAgain': 'Try Again',
  'error.generic': 'An error occurred',

  // Loading
  'loading.text': 'Loading...',
} as const;

export type MessageIds = keyof typeof en;
