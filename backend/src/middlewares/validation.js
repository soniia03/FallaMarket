// Middleware de validación para productos
const validateProduct = (req, res, next) => {
  const { name, description, price, category, seller } = req.body;
  const errors = [];
  
  // Validar nombre
  if (!name || name.trim().length < 3) {
    errors.push('El nombre es obligatorio y debe tener al menos 3 caracteres');
  }
  
  // Validar descripción
  if (!description || description.trim().length < 10) {
    errors.push('La descripción es obligatoria y debe tener al menos 10 caracteres');
  }
  
  if (description && description.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres');
  }
  
  // Validar precio
  if (!price || price <= 0) {
    errors.push('El precio es obligatorio y debe ser mayor a 0');
  }
  
  if (price > 10000) {
    errors.push('El precio no puede exceder 10000 euros');
  }
  
  // Validar categoría
  const validCategories = ['traje-fallero', 'traje-fallera', 'complementos', 'calzado', 'accesorios'];
  if (!category || !validCategories.includes(category)) {
    errors.push(`La categoría debe ser una de: ${validCategories.join(', ')}`);
  }
  
  // Validar vendedor
  if (!seller) {
    errors.push('El vendedor es obligatorio');
  }
  
  // Validar mongoose ObjectId format para seller
  if (seller && !seller.match(/^[0-9a-fA-F]{24}$/)) {
    errors.push('El ID del vendedor no tiene un formato válido');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }
  
  next();
};

// Middleware de validación para usuarios
const validateUser = (req, res, next) => {
  const { name, email, phone, location } = req.body;
  const errors = [];
  
  // Validar nombre
  if (!name || name.trim().length < 2) {
    errors.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
  }
  
  if (name && name.length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres');
  }
  
  // Validar email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('El email es obligatorio y debe tener un formato válido');
  }
  
  // Validar teléfono
  const phoneRegex = /^[0-9]{9,12}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.push('El teléfono es obligatorio y debe tener entre 9 y 12 dígitos');
  }
  
  // Validar ubicación
  if (!location || location.trim().length < 5) {
    errors.push('La ubicación es obligatoria y debe tener al menos 5 caracteres');
  }
  
  if (location && location.length > 200) {
    errors.push('La ubicación no puede exceder 200 caracteres');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }
  
  next();
};

// Middleware para validar ObjectId de MongoDB
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'ID no válido'
    });
  }
  
  next();
};

// Middleware para logging de requests
const logRequest = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// Middleware para manejo de errores de validación de Mongoose
const handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return res.status(400).json({
      success: false,
      message: `El ${field} '${value}' ya está en uso`
    });
  }
  
  next(err);
};

// Middleware para sanitizar input
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

// Middleware para verificar Content-Type en requests POST/PUT
const checkContentType = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type debe ser application/json'
      });
    }
  }
  next();
};

module.exports = {
  validateProduct,
  validateUser,
  validateObjectId,
  logRequest,
  handleValidationError,
  sanitizeInput,
  checkContentType
};