const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Inicializar conexión a la base de datos de forma asíncrona (no-bloqueante)
// Esto permite que Vercel inicie el servidor sin esperar a la BD
(async () => {
  try {
    require('../database');
    console.log('Database connection initialized');
  } catch (err) {
    console.error('Database connection error:', err);
    // Continúa funcionando incluso si la BD no conecta (importante para Vercel)
  }
})();

// Routes
// Vercel mounts functions under the `/api` prefix, so the incoming path
// will be `/v1/...` when the function file is `api/index.js` and the
// request is `/api/v1/...`. Mount routes without the leading `/api`.
app.use('/v1/trajes', require('../routes/traje.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/trajes/'));

module.exports = serverless(app);
