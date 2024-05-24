"use strict";

const { ENUM } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  },
};
