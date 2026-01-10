import { Request, Response } from 'express';
import { ExchangeRatesService } from 'services';
import { ApiError, ValidationError } from 'errors';

export class ExchangeRatesController {
  private exchangeRatesService: ExchangeRatesService;

  constructor() {
    this.exchangeRatesService = new ExchangeRatesService();
  }

  async getLatestRates(req: Request, res: Response): Promise<void> {
    try {
      const baseCurrency = req.query.base as string | undefined;
      const forceRefresh = req.query.forceRefresh === 'true';

      // Validate base currency is provided
      if (!baseCurrency) {
        throw new ValidationError('Base currency is required');
      }

      const rates = await this.exchangeRatesService.getLatestRates(baseCurrency, forceRefresh);

      res.json(rates);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        error: {
          message: error.message,
          code: error.code,
        },
      });

      return;
    }

    // Handle unexpected errors
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({
      error: {
        message,
      },
    });
  }
}
