const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

// Endpoint básico que SIEMPRE funciona
app.get('/', (req, res) => {
  res.json({
    message: '🎉 ¡FUNCIONA! Backend desplegado correctamente',
    status: 'SUCCESS',
    timestamp: new Date().toISOString(),
    project: 'FallaMarket Backend'
  });
});

// Test sin base de datos
app.get('/test', (req, res) => {
  res.json({
    test: 'OK',
    message: 'Endpoint de prueba funcionando'
  });
});

module.exports = serverless(app);