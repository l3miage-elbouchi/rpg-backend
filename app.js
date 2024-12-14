require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models');
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

const isTestEnv = process.env.NODE_ENV === 'test';

sequelize
  .sync({ force: isTestEnv })
  .then(() => {
    console.log('Database tables created!');
  })
  .catch((err) => {
    console.error('Error creating tables:', err.message);
  });

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
