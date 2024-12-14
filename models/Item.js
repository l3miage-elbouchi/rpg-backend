const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Character = require('./Character');

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Item.belongsTo(Character, { foreignKey: 'characterId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Item;
