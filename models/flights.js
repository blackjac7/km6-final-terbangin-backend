"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flights.hasMany(models.Tickets, {
        foreignKey: "flightId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Flights.belongsTo(models.Airlines, {
        foreignKey: "airlineId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Flights.belongsTo(models.Airports, {
        foreignKey: "startAirportId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Flights.belongsTo(models.Airports, {
        foreignKey: "endAirportId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Flights.init(
      {
          id: {
              allowNull: false,
              primaryKey: true,
              type: DataTypes.UUID,
          },
          airlineId: {
              allowNull: false,
              type: DataTypes.UUID,
          },
          duration: {
              type: DataTypes.INTEGER,
          },
          startAirportId: {
              allowNull: false,
              type: DataTypes.UUID,
          },
          endAirportId: {
              allowNull: false,
              type: DataTypes.UUID,
          },
          capacity: {
              allowNull: false,
              type: DataTypes.INTEGER,
          },
          departureAt: {
              allowNull: false,
              type: DataTypes.DATE,
          },
          arrivalAt: {
              allowNull: false,
              type: DataTypes.DATE,
          },
          deletedAt: {
              type: DataTypes.DATE,
          },
      },
      {
          sequelize,
          modelName: "Flights",
          paranoid: true,
      }
  );
  return Flights;
};
