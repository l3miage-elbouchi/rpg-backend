const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Character = require('./Character');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Event.belongsToMany(Character, { through: 'CharacterEvents', foreignKey: 'eventId' });

module.exports = Event;
