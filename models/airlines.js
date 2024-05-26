"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airlines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airlines.hasMany(models.Flights, {
        foreignKey: airlineId,
        onDelete: "CASCADE",
      });
    }
  }
  Airlines.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      serialNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.TEXT,
      },
      classType: {
        type: DataTypes.ENUM("ECONOMY", "BUSINESS", "FIRST_CLASS"),
      },
      baggage: {
        allowNull: "false",
        type: DataTypes.INTEGER,
      },
      cabinBaggage: {
        allowNull: "false",
        type: DataTypes.INTEGER,
      },
      additionals: {
        type: DataTypes.STRING,
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
    },
    {
      sequelize,
      modelName: "Airlines",
      paranoid: true,
    }
  );
  return Airlines;
};
