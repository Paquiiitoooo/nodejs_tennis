require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const joueurRoutes = require('./src/routes/joueurRoutes');
const tournoisRoutes = require('./src/routes/tournoisRoutes');
const clubRoutes = require('./src/routes/clubRoutes');
const championnatRoutes = require('./src/routes/championnatRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/joueurs', joueurRoutes);
app.use('/api/tournois', tournoisRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/championnats', championnatRoutes);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const uri = "mongodb+srv://admin:admin@projet.1mgrz5v.mongodb.net/?appName=projet";

mongoose.connect(uri)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
  });