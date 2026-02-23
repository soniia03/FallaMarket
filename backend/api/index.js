const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a BD en background (no bloqueante)
let dbConnected = false;
(async () => {
  try {
    require('../database');
    dbConnected = true;
    console.log('Database connection initialized');
  } catch (err) {
    console.error('DB init error:', err.message);
  }
})();

// Health check
app.get('/', (req, res) => {
  res.send('API is in /api/v1/trajes/');
});

// Routes - cargar rutas de trajes
app.use('/v1/trajes', require('../routes/traje.route'));

module.exports = serverless(app);
