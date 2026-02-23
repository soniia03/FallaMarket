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
// Vercel mounts functions under the `/api` prefix, so the incoming path
// will be `/v1/...` when the function file is `api/index.js` and the
// request is `/api/v1/...`. Mount routes without the leading `/api`.
app.use('/v1/trajes', require('../routes/traje.route'));
app.use('/', (req, res) => res.send('API is in /v1/trajes/'));

module.exports = serverless(app);
