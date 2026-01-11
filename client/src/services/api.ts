import type { ExchangeRatesResponse, ApiErrorResponse } from 'shared';

export const exchangeRatesApi = {
  getLatestRates: async (
    baseCurrency: string,
    forceRefresh = false
  ): Promise<ExchangeRatesResponse> => {
    // Use relative URL - nginx proxy handles routing to backend
    const url = new URL('/api/v1/exchange-rates/latest', window.location.origin);
    url.searchParams.append('base', baseCurrency);

    if (forceRefresh) {
      url.searchParams.append('forceRefresh', 'true');
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
