const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Inicializar conexión a la base de datos
require('../database');

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/trajes', require('../routes/traje.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/trajes/'));

module.exports = serverless(app);
