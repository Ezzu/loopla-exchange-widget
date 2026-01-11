import { useState, useEffect, useCallback } from 'react';
import type { UseExchangeRatesParams, UseExchangeRatesResult, ExchangeRate } from 'types';
import { exchangeRatesApi } from 'services';
import { DEFAULT_TARGET_CURRENCY, SOURCE_CURRENCIES, REFRESH_INTERVAL } from 'constants';

export const useExchangeRates = ({
  baseCurrency = DEFAULT_TARGET_CURRENCY,
  targetCurrencies = SOURCE_CURRENCIES,
  refreshInterval = REFRESH_INTERVAL,
}: UseExchangeRatesParams = {}): UseExchangeRatesResult => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchRates = useCallback(
    async (forceRefresh = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await exchangeRatesApi.getLatestRates(baseCurrency, forceRefresh);

        const exchangeRates: ExchangeRate[] = targetCurrencies
          .map((currency) => ({
            currency,
            rate: response.rates[currency] || 0,
          }))
          .filter((rate) => rate.rate > 0);

        setRates(exchangeRates);
        setLastUpdated(response.timestamp);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch exchange rates';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [baseCurrency, targetCurrencies]
  );

  useEffect(() => {
    fetchRates();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => fetchRates(true), refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchRates, refreshInterval]);

  return {
    rates,
    loading,
    error,
    refetch: fetchRates,
    lastUpdated,
  };
};
