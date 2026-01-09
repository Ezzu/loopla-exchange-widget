import { Request, Response } from 'express';
import { ExchangeRatesService } from 'services';

export class ExchangeRatesController {
  private exchangeRatesService: ExchangeRatesService;

  constructor() {
    this.exchangeRatesService = new ExchangeRatesService();
  }

  async getLatestRates(req: Request, res: Response): Promise<void> {
    try {
      const baseCurrency = req.query.base as string | undefined;
      const rates = await this.exchangeRatesService.getLatestRates(baseCurrency);

      res.json(rates);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch exchange rates';

      res.status(500).json({ error: message });
    }
  }
}
