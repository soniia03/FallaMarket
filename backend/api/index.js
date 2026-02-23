const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('../database');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    message: 'API is working! 🎉',
    status: 'OK',
    endpoints: {
      trajes: '/v1/trajes/',
      health: '/health'
    },
    database: isConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'OK',
    service: 'FallaMarket Backend',
    version: '1.0.0',
    database: isConnected
  });
});

// Routes
app.use('/v1/trajes', require('../routes/traje.route'));

module.exports = serverless(app);
