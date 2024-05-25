'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flights.init({
    airlineId: DataTypes.UUID,
    duration: DataTypes.INTEGER,
    startAirportId: DataTypes.UUID,
    endAirportId: DataTypes.UUID,
    capacity: DataTypes.INTEGER,
    departureAt: DataTypes.DATE,
    arrivalAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};