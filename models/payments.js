"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payments.belongsTo(models.users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  payments.init(
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
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      status: {
        allowNull: false,
        defaultValue: "ISSUED",
        type: Sequelize.ENUM("ISSUED", "UNPAID", "CANCELLED"),
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "payments",
      paranoid: true,
    }
  );
  return payments;
};
