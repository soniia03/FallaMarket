const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getActiveUsers,
  getUserProducts,
  deactivateUser,
  reactivateUser
} = require('../controllers/userController');

const { validateUser } = require('../middlewares/validation');

// Rutas de usuarios

// GET /api/v1/users/get/all - Obtener todos los usuarios
router.get('/get/all', getAllUsers);

// GET /api/v1/users/get/active - Obtener usuarios activos
router.get('/get/active', getActiveUsers);

// GET /api/v1/users/get/:id - Obtener usuario por ID
router.get('/get/:id', getUserById);

// GET /api/v1/users/email/:email - Buscar usuario por email
router.get('/email/:email', getUserByEmail);

// GET /api/v1/users/products/:id - Obtener productos de un usuario
router.get('/products/:id', getUserProducts);

// POST /api/v1/users/post - Crear nuevo usuario
router.post('/post', validateUser, createUser);

// PUT /api/v1/users/update/:id - Actualizar usuario
router.put('/update/:id', updateUser);

// DELETE /api/v1/users/delete/:id - Eliminar usuario
router.delete('/delete/:id', deleteUser);

// PATCH /api/v1/users/deactivate/:id - Desactivar usuario
router.patch('/deactivate/:id', deactivateUser);

// PATCH /api/v1/users/reactivate/:id - Reactivar usuario
router.patch('/reactivate/:id', reactivateUser);

module.exports = router;