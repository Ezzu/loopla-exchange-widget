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

  async getLatestRates(baseCurrency?: string): Promise<any> {
    const url = new URL(`${this.baseUrl}/latest`);
    url.searchParams.append('access_key', this.accessKey);
    
    if (baseCurrency) {
      url.searchParams.append('base', baseCurrency);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    return response.json();
  }
}
