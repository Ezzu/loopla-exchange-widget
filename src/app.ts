import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from 'routes';
import { swaggerSpec } from 'config';

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

export default app;
