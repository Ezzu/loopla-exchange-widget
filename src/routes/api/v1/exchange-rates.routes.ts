import { Router } from 'express';
import { ExchangeRatesController } from 'controllers';
import { validateBaseCurrency } from 'middlewares';

const router = Router();
const exchangeRatesController = new ExchangeRatesController();

/**
 * @swagger
 * /api/v1/exchange-rates/latest:
 *   get:
 *     summary: Get latest exchange rates
 *     description: Fetch the most recent exchange rates from exchangeratesapi.io
 *     tags:
 *       - Exchange Rates
 *     parameters:
 *       - in: query
 *         name: base
 *         schema:
 *           type: string
 *           pattern: '^[A-Z]{3}$'
 *           example: USD
 *         description: Base currency as a 3-letter ISO code (e.g., USD, EUR, GBP). Defaults to EUR if not provided.
 *     responses:
 *       200:
 *         description: Successfully retrieved exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 timestamp:
 *                   type: number
 *                   example: 1609459200
 *                 base:
 *                   type: string
 *                   example: EUR
 *                 date:
 *                   type: string
 *                   example: 2021-01-01
 *                 rates:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     USD: 1.22
 *                     GBP: 0.90
 *                     JPY: 126.49
 *       400:
 *         description: Invalid base currency format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Base currency must be a 3-letter ISO code (e.g., USD, EUR, GBP)
 *       500:
 *         description: Server error or external API failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch exchange rates
 */
router.get('/latest', validateBaseCurrency, (req, res) => exchangeRatesController.getLatestRates(req, res));

export default router;
