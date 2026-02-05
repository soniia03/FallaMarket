const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0.01, 'El precio debe ser mayor a 0'],
    max: [10000, 'El precio no puede exceder 10000 euros']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: ['traje-fallero', 'traje-fallera', 'complementos', 'calzado', 'accesorios'],
      message: 'La categoría debe ser: traje-fallero, traje-fallera, complementos, calzado o accesorios'
    }
  },
  condition: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: {
      values: ['nuevo', 'usado', 'reservado', 'vendido'],
      message: 'El estado debe ser: nuevo, usado, reservado o vendido'
    },
    default: 'nuevo'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El vendedor es obligatorio']
  },
  images: [{
    type: String,
    trim: true
  }],
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para optimizar búsquedas
productSchema.index({ category: 1 });
productSchema.index({ condition: 1 });
productSchema.index({ price: 1 });
productSchema.index({ available: 1 });
productSchema.index({ seller: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Middleware para validation personalizada
productSchema.pre('save', function(next) {
  // Si el producto está vendido, debe estar no disponible
  if (this.condition === 'vendido') {
    this.available = false;
  }
  
  // Si el producto está reservado, debe estar disponible
  if (this.condition === 'reservado') {
    this.available = true;
  }
  
  next();
});

// Virtual para obtener categoría formateada
productSchema.virtual('categoryFormatted').get(function() {
  const categoryMap = {
    'traje-fallero': 'Traje Fallero',
    'traje-fallera': 'Traje Fallera',
    'complementos': 'Complementos',
    'calzado': 'Calzado',
    'accesorios': 'Accesorios'
  };
  return categoryMap[this.category] || this.category;
});

// Virtual para obtener estado formateado
productSchema.virtual('conditionFormatted').get(function() {
  const conditionMap = {
    'nuevo': 'Nuevo',
    'usado': 'Usado',
    'reservado': 'Reservado',
    'vendido': 'Vendido'
  };
  return conditionMap[this.condition] || this.condition;
});

// Virtual para obtener precio formateado
productSchema.virtual('priceFormatted').get(function() {
  return `${this.price.toFixed(2)}€`;
});

// Método estático para encontrar productos disponibles
productSchema.statics.findAvailable = function() {
  return this.find({ available: true, condition: { $ne: 'vendido' } });
};

// Método estático para buscar por categoría
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, available: true });
};

// Método estático para buscar por rango de precio
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice },
    available: true 
  });
};

// Método para marcar como vendido
productSchema.methods.markAsSold = function() {
  this.condition = 'vendido';
  this.available = false;
  return this.save();
};

// Método para reservar producto
productSchema.methods.reserve = function() {
  this.condition = 'reservado';
  this.available = true;
  return this.save();
};

// Configurar para incluir virtuals en JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);