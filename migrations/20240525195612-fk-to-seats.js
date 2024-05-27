"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Seats", {
      fields: ["ticketId"],
      type: "foreign key",
      name: "fk-to-seats",
      references: {
        table: "Tickets",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Seats", "fk-to-seats");
  },
};
