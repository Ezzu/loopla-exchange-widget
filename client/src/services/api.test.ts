import { describe, it, expect, beforeEach, vi } from 'vitest';
import { exchangeRatesApi } from './api';

describe('exchangeRatesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLatestRates', () => {
    it('should fetch exchange rates without base currency', async () => {
      const mockResponse = {
        success: true,
        timestamp: 1768049047,
        base: 'EUR',
        date: '2026-01-10',
        rates: {
          USD: 1.163462,
          GBP: 0.867802,
          CHF: 0.931845,
        },
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await exchangeRatesApi.getLatestRates();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/exchange-rates/latest')
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch exchange rates with base currency', async () => {
      const mockResponse = {
        success: true,
        timestamp: 1768049047,
        base: 'USD',
        date: '2026-01-10',
        rates: {
          EUR: 0.859662,
          GBP: 0.746203,
        },
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await exchangeRatesApi.getLatestRates('USD');

      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining('base=USD'));
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(exchangeRatesApi.getLatestRates()).rejects.toThrow(
        'Failed to fetch exchange rates: Internal Server Error'
      );
    });

    it('should handle network errors', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(exchangeRatesApi.getLatestRates()).rejects.toThrow('Network error');
    });
  });
});
