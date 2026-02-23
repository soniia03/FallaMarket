const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test endpoint simple sin base de datos
app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    hasDatabase: !!process.env.DATABASE_URI
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FallaMarket Backend',
    version: '1.0.0'
  });
});

// Test de variable de entorno
app.get('/env-test', (req, res) => {
  res.json({
    databaseConfigured: !!process.env.DATABASE_URI,
    databaseLength: process.env.DATABASE_URI ? process.env.DATABASE_URI.length : 0
  });
});

module.exports = serverless(app);