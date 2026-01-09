import { Router } from 'express';
import { ExchangeRatesController } from 'controllers';

const router = Router();
const exchangeRatesController = new ExchangeRatesController();

router.get('/latest', (req, res) => exchangeRatesController.getLatestRates(req, res));

export default router;
