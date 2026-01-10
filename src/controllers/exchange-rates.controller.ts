import { Request, Response } from 'express';
import { ExchangeRatesService } from 'services';
import { ApiError, ValidationError } from 'errors';
import { createLogger } from 'utils';

export class ExchangeRatesController {
  private exchangeRatesService: ExchangeRatesService;
  private readonly logger;

  constructor() {
    this.logger = createLogger('ExchangeRatesController');
    this.exchangeRatesService = new ExchangeRatesService();
  }

  async getLatestRates(req: Request, res: Response): Promise<void> {
    try {
      const baseCurrency = req.query.base as string | undefined;
      const forceRefresh = req.query.forceRefresh === 'true';

      this.logger.info('Received exchange rates request', { baseCurrency, forceRefresh });

      if (!baseCurrency) {
        this.logger.warn('Base currency not provided in request');
        throw new ValidationError('Base currency is required');
      }

      const rates = await this.exchangeRatesService.getLatestRates(baseCurrency, forceRefresh);

      this.logger.info('Exchange rates request successful', { baseCurrency });
      res.json(rates);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof ApiError) {
      this.logger.error('API error occurred', {
        statusCode: error.statusCode,
        message: error.message,
        code: error.code,
      });

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
    this.logger.error('Unexpected error occurred', { message, error });

    res.status(500).json({
      error: {
        message,
      },
    });
  }
}
