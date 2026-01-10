import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ExchangeRatesResponse } from 'shared';
import { exchangeRatesApi } from './api';

describe('exchangeRatesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLatestRates', () => {
    it('should fetch exchange rates without base currency', async () => {
      const mockResponse: ExchangeRatesResponse = {
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
      const mockResponse: ExchangeRatesResponse = {
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
      const mockErrorResponse = {
        error: {
          message: 'Invalid API access key',
          code: 'invalid_access_key',
        },
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: 'Bad Gateway',
        json: async () => mockErrorResponse,
      });

      await expect(exchangeRatesApi.getLatestRates()).rejects.toThrow('Invalid API access key');
    });

    it('should handle network errors', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(exchangeRatesApi.getLatestRates()).rejects.toThrow('Network error');
    });
  });
});
