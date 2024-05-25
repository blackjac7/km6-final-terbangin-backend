"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Airlines", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      serialNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      classType: {
        type: Sequelize.ENUM("ECONOMY", "BUSINESS", "FIRST_CLASS"),
      },
      baggage: {
        type: Sequelize.INTEGER,
      },
      cabinBaggage: {
        type: Sequelize.INTEGER,
      },
      additionals: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        type: Sequelize.TIME,
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
    await queryInterface.dropTable("Airlines");
  },
};
