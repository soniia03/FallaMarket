const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getAvailableProducts,
  markProductAsSold,
  reserveProduct
} = require('../controllers/productController');

const { validateProduct } = require('../middlewares/validation');

// Rutas de productos

// GET /api/v1/products/get/all - Obtener todos los productos
router.get('/get/all', getAllProducts);

// GET /api/v1/products/get/available - Obtener solo productos disponibles
router.get('/get/available', getAvailableProducts);

// GET /api/v1/products/get/:id - Obtener producto por ID
router.get('/get/:id', getProductById);

// GET /api/v1/products/category/:category - Obtener productos por categoría
router.get('/category/:category', getProductsByCategory);

// GET /api/v1/products/search?q=query - Buscar productos por texto
router.get('/search', searchProducts);

// POST /api/v1/products/post - Crear nuevo producto
router.post('/post', validateProduct, createProduct);

// PUT /api/v1/products/update/:id - Actualizar producto
router.put('/update/:id', updateProduct);

// DELETE /api/v1/products/delete/:id - Eliminar producto
router.delete('/delete/:id', deleteProduct);

// PATCH /api/v1/products/sold/:id - Marcar como vendido
router.patch('/sold/:id', markProductAsSold);

// PATCH /api/v1/products/reserve/:id - Reservar producto
router.patch('/reserve/:id', reserveProduct);

module.exports = router;