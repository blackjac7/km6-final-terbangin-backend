"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OTP.hasOne(models.users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  OTP.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
      },
      code: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      expirationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      isUsed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "OTP",
      paranoid: true,
    }
  );
  return OTP;
};
