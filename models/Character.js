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
    validate: {
      len: {
        args: [3],
        msg: 'Name must be at least 3 characters long'
      }
    }
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
      min: {
        args: [1],
        msg: 'Health must be positive'
      },
      max: {
        args: [500],
        msg: 'Health must not exceed 500'
      }
    }
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      min: {
        args: [1],
        msg: 'Strength must be positive'
      }
    }
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
    validate: {
      min: {
        args: [1],
        msg: 'Defense must be positive'
      }
    }
  },
});

module.exports = Character;
