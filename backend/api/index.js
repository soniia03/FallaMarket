const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a BD con mejor manejo de errores
let dbConnected = false;
(async () => {
  try {
    const mongoose = require('mongoose');
    const URI = process.env.DATABASE_URI || 'mongodb+srv://FallerosMarket:SoniaYHugo@cluster0.ezgcchu.mongodb.net/Fallerosmarkey?appName=Cluster0';
    
    await mongoose.connect(URI);
    
    dbConnected = true;
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err.message);
    dbConnected = false;
  }
})();

// Health check
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'API is working! 🎉',
      status: 'OK',
      endpoints: {
        trajes: '/v1/trajes/',
        health: '/health'
      },
      database: dbConnected ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FallaMarket Backend',
    version: '1.0.0',
    database: dbConnected
  });
});

// Routes - cargar rutas de trajes solo si la DB está conectada
try {
  app.use('/v1/trajes', require('../routes/traje.route'));
} catch (error) {
  console.error('Error loading routes:', error.message);
}

module.exports = serverless(app);
