/*const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Person = require('./Person'); // Importez le modèle Person

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
});

// Relation : Un personnage appartient à une personne
Character.belongsTo(Person, { foreignKey: 'personId' });

module.exports = Character;*/
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
});

module.exports = Character;