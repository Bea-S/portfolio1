
const express = require('express');
const app = express();
const patientsRoutes = require('./routes/patients');
const doctorsRoutes = require('./routes/doctors');
const appointmentsRoutes = require('./routes/appointments');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Consultório Médico',
    version: '1.0.0',
    description: 'Documentação da API REST para consultório médico',
  },
  servers: [
    { url: 'http://localhost:3001', description: 'Servidor local' }
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use('/patients', patientsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API do Consultório Médico' });
});

module.exports = app;
