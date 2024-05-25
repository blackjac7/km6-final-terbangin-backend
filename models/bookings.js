'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init({
    userId: DataTypes.UUID,
    seatId: DataTypes.UUID,
    passangerId: DataTypes.UUID,
    ticketId: DataTypes.UUID,
    paymentId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};