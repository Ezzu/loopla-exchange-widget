import { Request, Response } from 'express';
import type { ExchangeRatesResponse } from 'shared';
import { ExchangeRatesController } from 'controllers';
import { ExchangeRatesService } from 'services';

jest.mock('services');

describe('ExchangeRatesController', () => {
  let controller: ExchangeRatesController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockService: jest.Mocked<ExchangeRatesService>;

  beforeEach(() => {
    controller = new ExchangeRatesController();
    mockService = (controller as any).exchangeRatesService;

    mockRequest = {
      query: {},
    };

    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getLatestRates', () => {
    it('should return 400 error when base currency is not provided', async () => {
      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          message: 'Base currency is required',
          code: 'validation_error',
        },
      });
    });

    it('should return exchange rates successfully with base currency', async () => {
      const mockRates: ExchangeRatesResponse = {
        success: true,
        timestamp: 1609459200,
        base: 'USD',
        date: '2021-01-01',
        rates: { EUR: 0.82, GBP: 0.73 },
      };

      mockRequest.query = { base: 'USD' };
      mockService.getLatestRates.mockResolvedValue(mockRates);

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockService.getLatestRates).toHaveBeenCalledWith('USD');
      expect(mockResponse.json).toHaveBeenCalledWith(mockRates);
    });

    it('should handle service errors', async () => {
      mockRequest.query = { base: 'USD' };
      const errorMessage = 'API connection failed';
      mockService.getLatestRates.mockRejectedValue(new Error(errorMessage));

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          message: errorMessage,
        },
      });
    });

    it('should handle unknown errors', async () => {
      mockRequest.query = { base: 'USD' };
      mockService.getLatestRates.mockRejectedValue('Unknown error');

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          message: 'An unexpected error occurred',
        },
      });
    });
  });
});
