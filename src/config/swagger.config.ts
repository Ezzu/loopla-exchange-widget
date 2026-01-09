import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Loopla Exchange Widget API',
    version: '1.0.0',
    description: 'API for fetching real-time exchange rates',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: process.env.BASE_URL,
      description: process.env.NODE_ENV || 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/api/v1/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);