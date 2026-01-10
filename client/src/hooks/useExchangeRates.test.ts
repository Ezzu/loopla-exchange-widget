import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { ExchangeRatesResponse } from 'shared';
import { useExchangeRates } from './useExchangeRates';
import * as exchangeRatesService from 'services';

vi.mock('services', () => ({
  exchangeRatesApi: {
    getLatestRates: vi.fn(),
  },
}));

describe('useExchangeRates', () => {
  const mockRatesResponse: ExchangeRatesResponse = {
    success: true,
    timestamp: 1768049047,
    base: 'EUR',
    date: '2026-01-10',
    rates: {
      USD: 1.163462,
      GBP: 0.867802,
      CHF: 0.931845,
      AUD: 1.737028,
      CAD: 1.619248,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch exchange rates on mount with default params', async () => {
    vi.mocked(exchangeRatesService.exchangeRatesApi.getLatestRates).mockResolvedValue(
      mockRatesResponse
    );

    const { result } = renderHook(() => useExchangeRates());

    expect(result.current.loading).toBe(true);
    expect(result.current.rates).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.rates).toEqual([
      { currency: 'GBP', rate: 0.867802 },
      { currency: 'USD', rate: 1.163462 },
      { currency: 'CHF', rate: 0.931845 },
      { currency: 'AUD', rate: 1.737028 },
      { currency: 'CAD', rate: 1.619248 },
    ]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch exchange rates with custom base currency', async () => {
    vi.mocked(exchangeRatesService.exchangeRatesApi.getLatestRates).mockResolvedValue({
      ...mockRatesResponse,
      base: 'USD',
    });

    const { result } = renderHook(() => useExchangeRates({ baseCurrency: 'USD' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(exchangeRatesService.exchangeRatesApi.getLatestRates).toHaveBeenCalledWith('USD');
    expect(result.current.rates.length).toBeGreaterThan(0);
  });

  it('should handle errors when fetching rates', async () => {
    const errorMessage = 'Failed to fetch rates';
    vi.mocked(exchangeRatesService.exchangeRatesApi.getLatestRates).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useExchangeRates());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.rates).toEqual([]);
  });

  it('should filter out currencies with zero or missing rates', async () => {
    vi.mocked(exchangeRatesService.exchangeRatesApi.getLatestRates).mockResolvedValue({
      ...mockRatesResponse,
      rates: {
        USD: 1.163462,
        GBP: 0,
        CHF: 0.931845,
      },
    });

    const { result } = renderHook(() =>
      useExchangeRates({ targetCurrencies: ['USD', 'GBP', 'CHF'] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.rates).toEqual([
      { currency: 'USD', rate: 1.163462 },
      { currency: 'CHF', rate: 0.931845 },
    ]);
  });

  it('should allow manual refetch', async () => {
    vi.mocked(exchangeRatesService.exchangeRatesApi.getLatestRates).mockResolvedValue(
      mockRatesResponse
    );

    const { result } = renderHook(() => useExchangeRates());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(exchangeRatesService.exchangeRatesApi.getLatestRates).toHaveBeenCalledTimes(1);

    await result.current.refetch();

    expect(exchangeRatesService.exchangeRatesApi.getLatestRates).toHaveBeenCalledTimes(2);
  });
});
