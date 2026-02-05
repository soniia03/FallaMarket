const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingresa un email válido'
    ]
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true,
    match: [/^[0-9]{9,12}$/, 'El teléfono debe tener entre 9 y 12 dígitos']
  },
  location: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true,
    minlength: [5, 'La ubicación debe tener al menos 5 caracteres'],
    maxlength: [200, 'La ubicación no puede exceder 200 caracteres']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índice para optimizar búsquedas por email
userSchema.index({ email: 1 });

// Índice para búsquedas por ubicación
userSchema.index({ location: 1 });

// Método para obtener información básica del usuario
userSchema.methods.getBasicInfo = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    location: this.location,
    registrationDate: this.registrationDate,
    isActive: this.isActive
  };
};

// Método estático para encontrar usuarios activos
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Middleware para actualizar la fecha de modificación
userSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

// Virtual para obtener el número de días desde el registro
userSchema.virtual('daysSinceRegistration').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.registrationDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Configurar para incluir virtuals en JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);