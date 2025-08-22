const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Agendamento Médico',
      version: '1.0.0',
    },
  },
  apis: [
    './routes/patients.js',
    './routes/doctors.js',
    './routes/appointments.js'
  ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
