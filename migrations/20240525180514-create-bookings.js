"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      seatId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      passangerId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      ticketId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("Bookings");
  },
};
