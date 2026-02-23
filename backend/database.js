const mongoose = require('mongoose');

// Use environment variable in production (Vercel). Keep the hardcoded
// URI only as a local fallback if needed.
const URI = process.env.MONGODB_URI || 'mongodb+srv://FallerosMarket:SoniaYHugo@cluster0.ezgcchu.mongodb.net/Fallerosmarkey?appName=Cluster0';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error('DB connection error:', err));

module.exports = mongoose;