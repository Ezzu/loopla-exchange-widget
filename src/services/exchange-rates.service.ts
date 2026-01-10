import { ExchangeRatesResponse } from 'shared';
import {
  BaseCurrencyRestrictedError,
  ExternalApiError,
  InvalidAccessKeyError,
  MissingAccessKeyError,
} from 'errors';
import { CacheService } from 'services';
import { buildExchangeRatesCacheKey, createLogger } from 'utils';

export class ExchangeRatesService {
  private readonly baseUrl: string;
  private readonly accessKey: string;
  private readonly cache: CacheService;
  private readonly logger;

  constructor() {
    this.logger = createLogger('ExchangeRatesService');
    this.cache = new CacheService(10);
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

    this.logger.info('Fetching exchange rates', { baseCurrency, forceRefresh });

    if (!forceRefresh) {
      const cachedData = this.cache.get<ExchangeRatesResponse>(cacheKey);
      if (cachedData) {
        this.logger.info('Cache hit', { baseCurrency });
        return cachedData;
      }
    }

    this.logger.info('Cache miss, fetching from external API', { baseCurrency });

    const url = new URL(`${this.baseUrl}/latest`);
    url.searchParams.append('access_key', this.accessKey);
    url.searchParams.append('base', baseCurrency);

    const response = await fetch(url.toString());

    // Try to parse JSON response
    let data: any;
    try {
      data = await response.json();
    } catch (error) {
      this.logger.error('Failed to parse JSON response', { baseCurrency, error });
      throw new ExternalApiError(`HTTP error: ${response.statusText}`);
    }

    if (data.error) {
      this.logger.error('External API returned error', {
        baseCurrency,
        errorCode: data.error.code,
        errorMessage: data.error.message,
      });
      this.handleApiError(data.error.code, data.error.message);
    }

    if (!response.ok) {
      this.logger.error('HTTP error from external API', {
        baseCurrency,
        status: response.status,
        statusText: response.statusText,
      });
      throw new ExternalApiError(`HTTP error: ${response.statusText}`);
    }

    const result = data as ExchangeRatesResponse;

    this.cache.set(cacheKey, result);
    this.logger.info('Exchange rates cached successfully', {
      baseCurrency,
      ratesCount: Object.keys(result.rates).length,
    });

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
