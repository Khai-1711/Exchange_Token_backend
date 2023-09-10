const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'My REST API',
            version: '1.0.0',
            description: 'API documentation for My REST API',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
