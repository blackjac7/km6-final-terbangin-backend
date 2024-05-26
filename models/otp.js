"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Otp.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Otp.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      code: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      expire: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      isUsed: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
    },
    {
      sequelize,
      modelName: "Otp",
      paranoid: true,
    }
  );
  return Otp;
};
