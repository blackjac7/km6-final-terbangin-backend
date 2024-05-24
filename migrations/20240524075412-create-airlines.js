'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('airlines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.TEXT
      },
      classType: {
        type: Sequelize.ENUM
      },
      baggage: {
        type: Sequelize.INTEGER
      },
      cabinBaggage: {
        type: Sequelize.INTEGER
      },
      additional: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('airlines');
  }
};