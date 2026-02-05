const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fallamarket');
    console.log(`🍃 MongoDB conectado: ${conn.connection.host}`);
    
    // Poblar datos de ejemplo si la base de datos está vacía
    await populateData();
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// Función para poblar datos de ejemplo
const populateData = async () => {
  const User = require('../models/User');
  const Product = require('../models/Product');
  
  try {
    // Verificar si ya hay datos
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    
    if (userCount === 0) {
      console.log('📝 Creando usuarios de ejemplo...');
      await createSampleUsers();
    }
    
    if (productCount === 0) {
      console.log('🎭 Creando productos de ejemplo...');
      await createSampleProducts();
    }
    
    if (userCount === 0 || productCount === 0) {
      console.log('✅ Datos de ejemplo creados exitosamente');
    }
    
  } catch (error) {
    console.error('❌ Error poblando datos:', error.message);
  }
};

// Crear usuarios de ejemplo
const createSampleUsers = async () => {
  const User = require('../models/User');
  
  const sampleUsers = [
    {
      name: 'María Carmen Pérez',
      email: 'mariacarmen@valencia.com',
      phone: '963123456',
      location: 'Russafa, Valencia'
    },
    {
      name: 'José Antonio López',
      email: 'joseantonio@fallas.com',
      phone: '963234567',
      location: 'El Carmen, Valencia'
    },
    {
      name: 'Ana Belén García',
      email: 'anabelen@valencia.org',
      phone: '963345678',
      location: 'Benimaclet, Valencia'
    },
    {
      name: 'Francisco Javier Martín',
      email: 'pacomartin@fallero.com',
      phone: '963456789',
      location: 'Campanar, Valencia'
    },
    {
      name: 'Carmen Rosa Torres',
      email: 'carmenrosa@valencia.net',
      phone: '963567890',
      location: 'Algirós, Valencia'
    },
    {
      name: 'Miguel Ángel Ruiz',
      email: 'miguelangel@falla.es',
      phone: '963678901',
      location: 'Extramurs, Valencia'
    },
    {
      name: 'Isabel María Santos',
      email: 'isabelmaria@valencia.es',
      phone: '963789012',
      location: 'Jesús, Valencia'
    },
    {
      name: 'Antonio José Moreno',
      email: 'antoniojose@fallas.es',
      phone: '963890123',
      location: 'Quatre Carreres, Valencia'
    },
    {
      name: 'Pilar Fernández',
      email: 'pilar@valencia.info',
      phone: '963901234',
      location: 'Poblats Marítims, Valencia'
    },
    {
      name: 'Rafael Jiménez',
      email: 'rafael@fallero.net',
      phone: '963012345',
      location: 'Camins al Grau, Valencia'
    },
    {
      name: 'Dolores Muñoz',
      email: 'lola@valencia.org',
      phone: '963123789',
      location: 'L\'Eixample, Valencia'
    },
    {
      name: 'Vicente Navarro',
      email: 'vicente@falla.com',
      phone: '963234890',
      location: 'La Saïdia, Valencia'
    },
    {
      name: 'Amparo Castell',
      email: 'amparo@valencia.com',
      phone: '963345901',
      location: 'Patraix, Valencia'
    },
    {
      name: 'Enrique Soler',
      email: 'quique@fallero.es',
      phone: '963456012',
      location: 'Rascanya, Valencia'
    },
    {
      name: 'Remedios Vidal',
      email: 'remedios@valencia.net',
      phone: '963567123',
      location: 'Poblats del Nord, Valencia'
    }
  ];
  
  await User.insertMany(sampleUsers);
};

// Crear productos de ejemplo
const createSampleProducts = async () => {
  const User = require('../models/User');
  const Product = require('../models/Product');
  
  // Obtener algunos usuarios para asignar como vendedores
  const users = await User.find().limit(10);
  
  const sampleProducts = [
    {
      name: 'Traje Fallero Siglo XVIII Completo',
      description: 'Traje tradicional fallero masculino del siglo XVIII. Incluye casaca, chaleco, pantalón, medias y zapatos. Excelente estado, usado una sola vez.',
      price: 450,
      category: 'traje-fallero',
      condition: 'usado',
      seller: users[0]._id,
      images: ['/images/traje-xviii-1.jpg', '/images/traje-xviii-2.jpg'],
      available: true
    },
    {
      name: 'Traje de Fallera Mayor Bordado',
      description: 'Precioso traje de fallera con bordados artesanales. Incluye saya, dengue, mantón y todos los complementos. Hecho a medida.',
      price: 1200,
      category: 'traje-fallera',
      condition: 'nuevo',
      seller: users[1]._id,
      images: ['/images/fallera-mayor-1.jpg', '/images/fallera-mayor-2.jpg'],
      available: true
    },
    {
      name: 'Fajín Fallero Artesanal',
      description: 'Fajín tradicional fallero hecho a mano con seda valenciana. Color granate con flecos dorados. Perfecto para complementar el traje.',
      price: 85,
      category: 'complementos',
      condition: 'nuevo',
      seller: users[2]._id,
      images: ['/images/fajin-granate-1.jpg'],
      available: true
    },
    {
      name: 'Espardeñas Valencianas Auténticas',
      description: 'Espardeñas tradicionales valencianas hechas en Alpargatas de Valencia. Número 42, color natural con cintas negras.',
      price: 35,
      category: 'calzado',
      condition: 'nuevo',
      seller: users[3]._id,
      images: ['/images/espardenyas-1.jpg', '/images/espardenyas-2.jpg'],
      available: true
    },
    {
      name: 'Peineta de Carey Antigua',
      description: 'Peineta antigua de carey natural con incrustaciones. Perfecta para el peinado tradicional de fallera. Pieza de colección.',
      price: 150,
      category: 'accesorios',
      condition: 'usado',
      seller: users[4]._id,
      images: ['/images/peineta-carey-1.jpg'],
      available: true
    },
    {
      name: 'Traje Fallero Corte Moderno',
      description: 'Traje fallero de corte moderno con chaqueta ajustada. Ideal para falleros jóvenes. Talla M, color azul marino.',
      price: 320,
      category: 'traje-fallero',
      condition: 'nuevo',
      seller: users[5]._id,
      images: ['/images/traje-moderno-1.jpg'],
      available: true
    },
    {
      name: 'Mantón de Manila Bordado',
      description: 'Espectacular mantón de Manila con bordados florales. Perfecto para las ocasiones más especiales de las fallas.',
      price: 890,
      category: 'complementos',
      condition: 'usado',
      seller: users[6]._id,
      images: ['/images/manton-manila-1.jpg', '/images/manton-manila-2.jpg'],
      available: true
    },
    {
      name: 'Zapatos de Fallera Negros',
      description: 'Zapatos tradicionales de fallera en piel negra. Tacón medio, muy cómodos. Talla 38, perfectos para largas jornadas.',
      price: 75,
      category: 'calzado',
      condition: 'usado',
      seller: users[7]._id,
      images: ['/images/zapatos-fallera-1.jpg'],
      available: true
    },
    {
      name: 'Flores de Azahar Naturales',
      description: 'Ramo de flores de azahar naturales preservadas. Ideales para el moño de fallera. Duración garantizada toda la temporada.',
      price: 25,
      category: 'accesorios',
      condition: 'nuevo',
      seller: users[8]._id,
      images: ['/images/azahar-1.jpg'],
      available: true
    },
    {
      name: 'Traje de Fallera Infantil',
      description: 'Precioso traje de fallera para niña de 8-10 años. Incluye todos los complementos. Solo usado en una ocasión.',
      price: 180,
      category: 'traje-fallera',
      condition: 'usado',
      seller: users[9]._id,
      images: ['/images/fallera-infantil-1.jpg'],
      available: true
    },
    {
      name: 'Chaleco Fallero Brocado',
      description: 'Elegante chaleco fallero de brocado dorado. Perfecto estado, botones originales de nácar. Talla L.',
      price: 95,
      category: 'traje-fallero',
      condition: 'usado',
      seller: users[0]._id,
      images: ['/images/chaleco-brocado-1.jpg'],
      available: true
    },
    {
      name: 'Pendientes de Fallera Dorados',
      description: 'Pendientes tradicionales de fallera en oro de 18k. Diseño clásico valenciano con perlas cultivadas.',
      price: 240,
      category: 'accesorios',
      condition: 'nuevo',
      seller: users[1]._id,
      images: ['/images/pendientes-oro-1.jpg'],
      available: true
    },
    {
      name: 'Pantalón Fallero de Terciopelo',
      description: 'Pantalón fallero de terciopelo negro, corte tradicional. Talla 48, cintura ajustable con fajín.',
      price: 85,
      category: 'traje-fallero',
      condition: 'nuevo',
      seller: users[2]._id,
      images: ['/images/pantalon-terciopelo-1.jpg'],
      available: true
    },
    {
      name: 'Saya de Fallera Estampada',
      description: 'Saya tradicional con estampado de flores valencianas. Tela de alta calidad, perfecta caída. Talla M.',
      price: 120,
      category: 'traje-fallera',
      condition: 'nuevo',
      seller: users[3]._id,
      images: ['/images/saya-estampada-1.jpg'],
      available: true
    },
    {
      name: 'Camisola Fallero Bordada',
      description: 'Camisola fallero con bordados artesanales en el cuello y puños. Lino blanco de primera calidad.',
      price: 65,
      category: 'traje-fallero',
      condition: 'nuevo',
      seller: users[4]._id,
      images: ['/images/camisola-bordada-1.jpg'],
      available: true
    },
    {
      name: 'Rebozillo de Fallera',
      description: 'Rebozillo tradicional de fallera en blanco roto. Encaje artesanal valenciano, pieza única y delicada.',
      price: 110,
      category: 'complementos',
      condition: 'usado',
      seller: users[5]._id,
      images: ['/images/rebozillo-1.jpg'],
      available: true
    },
    {
      name: 'Medias de Seda Fallero',
      description: 'Medias tradicionales de fallero en seda blanca. Talla única, perfectas para completar el atuendo.',
      price: 28,
      category: 'complementos',
      condition: 'nuevo',
      seller: users[6]._id,
      images: ['/images/medias-seda-1.jpg'],
      available: true
    },
    {
      name: 'Casaca Fallero Época Victoriana',
      description: 'Impresionante casaca de época victoriana para fallero. Detalles únicos, botones de época. Talla L.',
      price: 380,
      category: 'traje-fallero',
      condition: 'usado',
      seller: users[7]._id,
      images: ['/images/casaca-victoriana-1.jpg'],
      available: true
    },
    {
      name: 'Collar de Perlas Fallera',
      description: 'Collar de tres vueltas de perlas cultivadas. Cierre de oro blanco, perfecto para traje de fallera.',
      price: 195,
      category: 'accesorios',
      condition: 'nuevo',
      seller: users[8]._id,
      images: ['/images/collar-perlas-1.jpg'],
      available: true
    },
    {
      name: 'Traje Completo Fallera Vintage',
      description: 'Traje completo de fallera de los años 80. Estilo vintage, muy bien conservado. Incluye todos los complementos.',
      price: 650,
      category: 'traje-fallera',
      condition: 'usado',
      seller: users[9]._id,
      images: ['/images/fallera-vintage-1.jpg', '/images/fallera-vintage-2.jpg'],
      available: true
    }
  ];
  
  await Product.insertMany(sampleProducts);
};

module.exports = connectDB;