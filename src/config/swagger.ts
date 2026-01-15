import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js REST API with MongoDB',
      version: '1.0.0',
      description: 'API documentation for Node.js REST API with MongoDB, TypeScript, and JWT Authentication',
      contact: {
        name: 'Patrick'
      }
    },
    servers: [
      {
        url: 'https://node-with-mongo-p4vc.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
