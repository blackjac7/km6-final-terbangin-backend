"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Tickets", {
      fields: ["flightId"],
      type: "foreign key",
      name: "fk-to-tickets",
      references: {
        table: "Flights",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Tickets", "fk-to-tickets");
  },
};
