"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class helperBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      helperBookings.belongsToMany(models.Passangers, {
        foreignKey: "passangerId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      helperBookings.belongsTo(models.Bookings, {
        foreignKey: "bookingId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      helperBookings.belongsToMany(models.Seats, {
        foreignKey: "seatId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  helperBookings.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      passangerId: {
        type: DataTypes.UUID,
      },
      bookingId: {
        type: DataTypes.UUID,
      },
      seatId: {
        type: DataTypes.UUID,
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
    },
    {
      sequelize,
      modelName: "helperBookings",
      paranoid: true,
    }
  );
  return helperBookings;
};
