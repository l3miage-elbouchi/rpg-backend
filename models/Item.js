const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Character = require('./Character'); // Importez le modèle Character

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // Ex : weapon, armor, potion
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relation : Un objet appartient à un personnage
Item.belongsTo(Character, { foreignKey: 'characterId' });

module.exports = Item;
