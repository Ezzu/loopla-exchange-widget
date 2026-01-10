import type { ExchangeRatesResponse, ApiErrorResponse } from 'shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const exchangeRatesApi = {
  getLatestRates: async (baseCurrency?: string): Promise<ExchangeRatesResponse> => {
    const url = new URL(`${API_BASE_URL}/api/v1/exchange-rates/latest`);

    if (baseCurrency) {
      url.searchParams.append('base', baseCurrency);
    }

    const response = await fetch(url.toString());

    const data = await response.json();

    // Check if response is an error
    if (!response.ok) {
      const errorData = data as ApiErrorResponse;
      const errorMessage =
        errorData.error?.message || `Failed to fetch exchange rates: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data as ExchangeRatesResponse;
  },
};
