import { ExchangeRatesResponse } from 'shared';
import {
  BaseCurrencyRestrictedError,
  ExternalApiError,
  InvalidAccessKeyError,
  MissingAccessKeyError,
} from 'errors';
import { CacheService } from 'services';
import { buildExchangeRatesCacheKey } from 'utils';

export class ExchangeRatesService {
  private readonly baseUrl: string;
  private readonly accessKey: string;
  private readonly cache: CacheService;

  constructor() {
    this.cache = new CacheService(10); // 10 minutes TTL
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

  async getLatestRates(baseCurrency: string, forceRefresh = false): Promise<ExchangeRatesResponse> {
    const cacheKey = buildExchangeRatesCacheKey(baseCurrency);

    if (!forceRefresh) {
      const cachedData = this.cache.get<ExchangeRatesResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const url = new URL(`${this.baseUrl}/latest`);
    url.searchParams.append('access_key', this.accessKey);
    url.searchParams.append('base', baseCurrency);

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

    const result = data as ExchangeRatesResponse;

    // Cache the result
    this.cache.set(cacheKey, result);

    // Return the success response
    return result;
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
