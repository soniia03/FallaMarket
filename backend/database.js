const mongoose = require('mongoose');

// Lee la cadena de conexión desde la variable de entorno DATABASE_URI
const URI = process.env.DATABASE_URI || 'mongodb+srv://FallerosMarket:SoniaYHugo@cluster0.ezgcchu.mongodb.net/Fallerosmarkey?appName=Cluster0';

// Conectar sin bloquear
mongoose.connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(err => console.error('DB connection error:', err));

module.exports = mongoose;