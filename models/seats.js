"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seats.hasOne(models.helperBookings, {
        foreignKey: "seatId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Seats.belongsTo(models.Tickets, {
        foreignKey: "ticketId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Seats.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      ticketId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      seatNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      airlineClass: {
        allowNull: false,
        type: DataTypes.ENUM("ECONOMY", "BUSINESS", "FIRST_CLASS"),
      },
      isAvailable: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
    },
    {
      sequelize,
      modelName: "Seats",
      paranoid: true,
    }
  );
  return Seats;
};
