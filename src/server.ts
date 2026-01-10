import 'dotenv/config';
import app from './app';
import { logger } from 'utils';

const PORT = process.env.PORT || 3000;

app.get('/health', (_, res) => {
  res.status(200).send('API is healthy!');
});

app.listen(PORT, () => {
  logger.info('Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
  });
});
