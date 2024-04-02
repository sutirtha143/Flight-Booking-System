'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, { //if an airplane gets deleted from database
        foreignKey: 'airplaneId',//then on flights for that airplane will exist
        onDelete: 'CASCADE'   //and thus will get deleted from flight table
      })
    }
  }
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        max: 1000
      }
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};