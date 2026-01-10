import type { ExchangeRatesResponse } from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const exchangeRatesApi = {
  getLatestRates: async (baseCurrency?: string): Promise<ExchangeRatesResponse> => {
    const url = new URL(`${API_BASE_URL}/api/v1/exchange-rates/latest`);

    if (baseCurrency) {
      url.searchParams.append('base', baseCurrency);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    return response.json();
  },
};
