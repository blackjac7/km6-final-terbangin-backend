"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notifications.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Notifications.belongsTo(models.Bookings, {
        foreignKey: "bookingId",
        onDelete: "CASCADE",
      });
    }
  }
  Notifications.init(
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
          table: "Users",
          key: "id",
        },
      },
      bookingId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          table: "Bookings",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      deletedAt: {
        type: DataTypes.TIME,
      },
    },
    {
      sequelize,
      modelName: "Notifications",
      paranoid: true,
    }
  );
  return Notifications;
};
