const User = require('../models/User');
const Product = require('../models/Product');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ registrationDate: -1 });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un usuario con este email'
      });
    }
    
    const user = new User({
      name,
      email,
      phone,
      location
    });
    
    const savedUser = await user.save();
    
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: savedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message
    });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Si se está actualizando el email, verificar que no existe
    if (updateData.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: id } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe un usuario con este email'
        });
      }
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si el usuario tiene productos asociados
    const userProducts = await Product.find({ seller: id });
    
    if (userProducts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar el usuario porque tiene productos asociados',
        productCount: userProducts.length
      });
    }
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};

// Buscar usuario por email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado con este email'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar usuario por email',
      error: error.message
    });
  }
};

// Obtener usuarios activos
const getActiveUsers = async (req, res) => {
  try {
    const users = await User.findActive().sort({ registrationDate: -1 });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios activos',
      error: error.message
    });
  }
};

// Obtener productos de un usuario
const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    const products = await Product.find({ seller: id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      userId: id,
      userName: user.name,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos del usuario',
      error: error.message
    });
  }
};

// Desactivar usuario (soft delete)
const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuario desactivado exitosamente',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al desactivar usuario',
      error: error.message
    });
  }
};

// Reactivar usuario
const reactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuario reactivado exitosamente',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al reactivar usuario',
      error: error.message
    });
  }
};

module.exports = {
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
};