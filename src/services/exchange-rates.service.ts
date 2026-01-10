import { ExchangeRatesResponse } from 'shared';
import {
  BaseCurrencyRestrictedError,
  ExternalApiError,
  InvalidAccessKeyError,
  MissingAccessKeyError,
} from 'errors';

export class ExchangeRatesService {
  private readonly baseUrl: string;
  private readonly accessKey: string;

  constructor() {
    const baseUrl = process.env.EXCHANGE_RATES_BASE_URL;
    const key = process.env.EXCHANGE_RATES_API_KEY;

    if (!baseUrl) {
      throw new Error('EXCHANGE_RATES_BASE_URL is not defined in environment variables');
    }
    if (!key) {
      throw new Error('EXCHANGE_RATES_API_KEY is not defined in environment variables');
    }

    this.baseUrl = baseUrl;
    this.accessKey = key;
  }

  async getLatestRates(baseCurrency?: string): Promise<ExchangeRatesResponse> {
    const url = new URL(`${this.baseUrl}/latest`);
    url.searchParams.append('access_key', this.accessKey);

    if (baseCurrency) {
      url.searchParams.append('base', baseCurrency);
    }

    const response = await fetch(url.toString());

    // Try to parse JSON response
    let data: any;
    try {
      data = await response.json();
    } catch (error) {
      // If JSON parsing fails, throw with HTTP status
      throw new ExternalApiError(`HTTP error: ${response.statusText}`);
    }

    // Check if the API returned an error response
    if (data.error) {
      this.handleApiError(data.error.code, data.error.message);
    }

    // Check HTTP status as fallback
    if (!response.ok) {
      throw new ExternalApiError(`HTTP error: ${response.statusText}`);
    }

    // Return the success response
    return data as ExchangeRatesResponse;
  }

  private handleApiError(code: string, message: string): never {
    switch (code) {
      case 'invalid_access_key':
        throw new InvalidAccessKeyError();
      case 'missing_access_key':
        throw new MissingAccessKeyError();
      case 'base_currency_access_restricted':
        throw new BaseCurrencyRestrictedError();
      default:
        throw new ExternalApiError(message, code);
    }
  }
}
