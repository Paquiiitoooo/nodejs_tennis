// Service de gestion de la base de données
const mongoose = require('mongoose');

// Fonction de connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Options de connexion si nécessaire
    });
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };

