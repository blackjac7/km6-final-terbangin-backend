'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airlines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  airlines.init({
    serialNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.TEXT,
    classType: DataTypes.ENUM,
    baggage: DataTypes.INTEGER,
    cabinBaggage: DataTypes.INTEGER,
    additional: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'airlines',
  });
  return airlines;
};