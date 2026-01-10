import { ExchangeRatesService } from './exchange-rates.service';

describe('ExchangeRatesService', () => {
  let service: ExchangeRatesService;

  beforeAll(() => {
    process.env.EXCHANGE_RATES_BASE_URL = 'https://api.exchangeratesapi.io/v1';
    process.env.EXCHANGE_RATES_API_KEY = 'test-api-key';
  });

  beforeEach(() => {
    service = new ExchangeRatesService();
  });

  describe('constructor', () => {
    it('should throw error if EXCHANGE_RATES_BASE_URL is not defined', () => {
      delete process.env.EXCHANGE_RATES_BASE_URL;
      expect(() => new ExchangeRatesService()).toThrow('EXCHANGE_RATES_BASE_URL is not defined');
      process.env.EXCHANGE_RATES_BASE_URL = 'https://api.exchangeratesapi.io/v1';
    });

    it('should throw error if EXCHANGE_RATES_API_KEY is not defined', () => {
      delete process.env.EXCHANGE_RATES_API_KEY;
      expect(() => new ExchangeRatesService()).toThrow('EXCHANGE_RATES_API_KEY is not defined');
      process.env.EXCHANGE_RATES_API_KEY = 'test-api-key';
    });

    it('should create instance successfully with valid environment variables', () => {
      expect(service).toBeInstanceOf(ExchangeRatesService);
    });
  });

  describe('getLatestRates', () => {
    it('should fetch exchange rates without base currency', async () => {
      const mockResponse = {
        success: true,
        timestamp: 1609459200,
        base: 'EUR',
        date: '2021-01-01',
        rates: { USD: 1.22, GBP: 0.9 },
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as jest.Mock;

      const result = await service.getLatestRates('EUR', false);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.exchangeratesapi.io/v1/latest')
      );
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('access_key=test-api-key'));
      expect(result).toEqual(mockResponse);
    });

    it('should fetch exchange rates with base currency', async () => {
      const mockResponse = {
        success: true,
        timestamp: 1609459200,
        base: 'USD',
        date: '2021-01-01',
        rates: { EUR: 0.82, GBP: 0.73 },
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as jest.Mock;

      const result = await service.getLatestRates('USD');

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('base=USD'));
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API request fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Unauthorized',
          json: () => Promise.reject(new Error('Invalid JSON')),
        })
      ) as jest.Mock;

      await expect(service.getLatestRates('EUR', false)).rejects.toThrow(
        'HTTP error: Unauthorized'
      );
    });
  });
});
