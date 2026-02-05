const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Importar rutas
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Crear aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de documentación
app.get('/api/v1/documentacion', (req, res) => {
  res.json({
    message: 'FallaMarket API - Marketplace de Trajes Falleros Valencianos',
    version: '1.0.0',
    author: 'Estudiante DAW',
    description: 'API REST para la gestión de productos y usuarios en marketplace fallero',
    location: 'C:\\xampp\\htdocs\\FallaMarket',
    endpoints: {
      products: {
        'GET /api/v1/products/get/all': 'Obtener todos los productos',
        'GET /api/v1/products/get/:id': 'Obtener producto por ID',
        'POST /api/v1/products/post': 'Crear nuevo producto',
        'PUT /api/v1/products/update/:id': 'Actualizar producto',
        'DELETE /api/v1/products/delete/:id': 'Eliminar producto',
        'GET /api/v1/products/category/:category': 'Filtrar por categoría',
        'GET /api/v1/products/search?q=query': 'Búsqueda por nombre/descripción'
      },
      users: {
        'GET /api/v1/users/get/all': 'Obtener todos los usuarios',
        'GET /api/v1/users/get/:id': 'Obtener usuario por ID',
        'POST /api/v1/users/post': 'Crear nuevo usuario',
        'PUT /api/v1/users/update/:id': 'Actualizar usuario',
        'DELETE /api/v1/users/delete/:id': 'Eliminar usuario',
        'GET /api/v1/users/email/:email': 'Buscar usuario por email'
      }
    },
    categories: ['traje-fallero', 'traje-fallera', 'complementos', 'calzado', 'accesorios'],
    conditions: ['nuevo', 'usado', 'reservado', 'vendido']
  });
});

// Rutas API
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a FallaMarket API',
    documentation: '/api/v1/documentacion',
    location: 'C:\\xampp\\htdocs\\FallaMarket'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    documentation: '/api/v1/documentacion'
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

module.exports = app;