const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Importez l'instance Sequelize

// Définir le modèle Person
const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Person;
