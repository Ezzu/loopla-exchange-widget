import { Router } from 'express';
import exchangeRatesRoutes from './exchange-rates.routes';

const apiRouter = Router();

apiRouter.use('/exchange-rates', exchangeRatesRoutes);

export default apiRouter;