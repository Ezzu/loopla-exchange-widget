import type { ExchangeRate } from 'types';

// useExchangeRates hook types
export interface UseExchangeRatesParams {
  baseCurrency?: string;
  targetCurrencies?: string[];
  refreshInterval?: number;
}

export interface UseExchangeRatesResult {
  rates: ExchangeRate[];
  loading: boolean;
  error: string | null;
  refetch: (forceRefresh?: boolean) => Promise<void>;
  lastUpdated: number | null;
}
