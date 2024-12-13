/*

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models'); // Importez votre instance Sequelize

const itemRoutes = require('./routes/itemRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Importer les routes
const characterRoutes = require('./routes/characterRoutes');
app.use('/characters', characterRoutes);

// Routes
app.use('/items', itemRoutes); // Déclarez les routes après avoir initialisé `app`

const eventRoutes = require('./routes/eventRoutes');
app.use('/events', eventRoutes);


// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Synchronisation de la base de données
sequelize
  .sync({ force: false }) // `force: false` pour ne pas recréer les tables si elles existent déjà
  .then(() => {
    console.log('Database tables created!');
  })
  .catch((err) => {
    console.error('Error creating tables:', err.message);
  });

// Démarrer le serveur uniquement si ce n'est pas un test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Exporter l'application pour les tests
module.exports = app;
*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models'); // Assurez-vous que ceci pointe bien vers votre instance Sequelize

const characterRoutes = require('./routes/characterRoutes');
const itemRoutes = require('./routes/itemRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/characters', characterRoutes);
app.use('/items', itemRoutes);
app.use('/events', eventRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Détecter l'environnement de test
const isTestEnv = process.env.NODE_ENV === 'test';

// Synchronisation de la base de données
sequelize
  .sync({ force: isTestEnv }) // Force = true en test pour être sûr d'avoir une base vide
  .then(() => {
    console.log('Database tables created!');
  })
  .catch((err) => {
    console.error('Error creating tables:', err.message);
  });

// Lancer le serveur uniquement si on n'est pas en test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
