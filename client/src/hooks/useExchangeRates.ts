import { useState, useEffect, useCallback } from 'react';
import type { ExchangeRate } from 'types';
import { exchangeRatesApi } from 'services';

interface UseExchangeRatesParams {
  baseCurrency?: string;
  targetCurrencies?: string[];
  refreshInterval?: number;
}

interface UseExchangeRatesResult {
  rates: ExchangeRate[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExchangeRates = ({
  baseCurrency = 'GBP',
  targetCurrencies = ['USD', 'EUR', 'CHF', 'AUD', 'CAD'],
  refreshInterval,
}: UseExchangeRatesParams): UseExchangeRatesResult => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await exchangeRatesApi.getLatestRates(baseCurrency);

      const exchangeRates: ExchangeRate[] = targetCurrencies
        .map((currency) => ({
          currency,
          rate: response.rates[currency] || 0,
        }))
        .filter((rate) => rate.rate > 0);

      setRates(exchangeRates);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch exchange rates';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [baseCurrency, targetCurrencies]);

  useEffect(() => {
    fetchRates();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchRates, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [baseCurrency, targetCurrencies, refreshInterval, fetchRates]);

  return {
    rates,
    loading,
    error,
    refetch: fetchRates,
  };
};
