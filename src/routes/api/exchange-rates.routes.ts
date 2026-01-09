import { Router } from 'express';
import { ExchangeRatesController } from 'controllers';
import { validateBaseCurrency } from 'middlewares';

const router = Router();
const exchangeRatesController = new ExchangeRatesController();

router.get('/latest', validateBaseCurrency, (req, res) => exchangeRatesController.getLatestRates(req, res));

export default router;
