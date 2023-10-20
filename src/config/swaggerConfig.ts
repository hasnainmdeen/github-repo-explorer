import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GitHub Repo Explorer API',
      version: '1.0.0',
    },
  },

  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default specs;