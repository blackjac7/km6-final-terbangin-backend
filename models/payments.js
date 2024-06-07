"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Payments.belongsTo(models.Users, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Payments.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
        },
        expire: {
          type: DataTypes.DATE,
        },
        status: {
          defaultValue: "ISSUED",
          type: DataTypes.ENUM("ISSUED", "UNPAID", "CANCELLED"),
        },
        method: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        link: {
          type: DataTypes.STRING,
        },
        totalPrice: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Payments",
        paranoid: true,
      }
    );
    return Payments;
};
