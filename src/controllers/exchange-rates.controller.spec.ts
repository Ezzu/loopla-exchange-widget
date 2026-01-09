import { Request, Response } from 'express';
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
    it('should return exchange rates successfully without base currency', async () => {
      const mockRates = {
        success: true,
        timestamp: 1609459200,
        base: 'EUR',
        date: '2021-01-01',
        rates: { USD: 1.22, GBP: 0.9 },
      };

      mockService.getLatestRates.mockResolvedValue(mockRates);

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockService.getLatestRates).toHaveBeenCalledWith(undefined);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRates);
    });

    it('should return exchange rates successfully with base currency', async () => {
      const mockRates = {
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
      const errorMessage = 'API connection failed';
      mockService.getLatestRates.mockRejectedValue(new Error(errorMessage));

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should handle unknown errors', async () => {
      mockService.getLatestRates.mockRejectedValue('Unknown error');

      await controller.getLatestRates(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        error: 'Failed to fetch exchange rates' 
      });
    });
  });
});