'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class helperBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  helperBookings.init({
    passangerId: DataTypes.UUID,
    bookingId: DataTypes.UUID,
    seatId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'helperBookings',
  });
  return helperBookings;
};