"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tickets.hasOne(models.Bookings, {
        foreignKey: "ticketId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Tickets.hasOne(models.Seats, {
        foreignKey: "ticketId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Tickets.belongsTo(models.Flights, {
        foreignKey: "flightId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Tickets.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      flightId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM("BABY", "CHILD", "ADULT"),
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
      paranoid: true,
    }
  );
  return Tickets;
};
