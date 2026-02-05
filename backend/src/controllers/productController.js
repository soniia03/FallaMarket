const Product = require('../models/Product');
const User = require('../models/User');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'name email location')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email phone location registrationDate');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message
    });
  }
};

// Crear nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, condition, seller, images } = req.body;
    
    // Verificar que el vendedor existe
    const sellerExists = await User.findById(seller);
    if (!sellerExists) {
      return res.status(400).json({
        success: false,
        message: 'El vendedor especificado no existe'
      });
    }
    
    // Verificar que el vendedor está activo
    if (!sellerExists.isActive) {
      return res.status(400).json({
        success: false,
        message: 'El vendedor no tiene una cuenta activa'
      });
    }
    
    const product = new Product({
      name,
      description,
      price,
      category,
      condition: condition || 'nuevo',
      seller,
      images: images || []
    });
    
    const savedProduct = await product.save();
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate('seller', 'name email location');
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: populatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Si se está cambiando el vendedor, verificar que existe y está activo
    if (updateData.seller) {
      const sellerExists = await User.findById(updateData.seller);
      if (!sellerExists || !sellerExists.isActive) {
        return res.status(400).json({
          success: false,
          message: 'El vendedor especificado no existe o no está activo'
        });
      }
    }
    
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('seller', 'name email location');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};

// Obtener productos por categoría
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const validCategories = ['traje-fallero', 'traje-fallera', 'complementos', 'calzado', 'accesorios'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Categoría no válida',
        validCategories
      });
    }
    
    const products = await Product.findByCategory(category)
      .populate('seller', 'name email location')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      category: category,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos por categoría',
      error: error.message
    });
  }
};

// Buscar productos por texto
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }
    
    const products = await Product.find({
      $and: [
        { available: true },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
          ]
        }
      ]
    })
    .populate('seller', 'name email location')
    .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      query: q,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar productos',
      error: error.message
    });
  }
};

// Obtener productos disponibles solamente
const getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.findAvailable()
      .populate('seller', 'name email location')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos disponibles',
      error: error.message
    });
  }
};

// Marcar producto como vendido
const markProductAsSold = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    await product.markAsSold();
    
    res.json({
      success: true,
      message: 'Producto marcado como vendido',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al marcar producto como vendido',
      error: error.message
    });
  }
};

// Reservar producto
const reserveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    if (product.condition === 'vendido') {
      return res.status(400).json({
        success: false,
        message: 'El producto ya está vendido'
      });
    }
    
    await product.reserve();
    
    res.json({
      success: true,
      message: 'Producto reservado exitosamente',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al reservar producto',
      error: error.message
    });
  }
};

module.exports = {
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
};