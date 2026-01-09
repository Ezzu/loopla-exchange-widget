import { Router } from 'express';
import exchangeRatesRoutes from './exchange-rates.routes';

const v1Router = Router();

v1Router.use('/exchange-rates', exchangeRatesRoutes);

export default v1Router;