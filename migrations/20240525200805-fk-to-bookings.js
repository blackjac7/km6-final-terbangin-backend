"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Bookings", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk-to-bookings-userId",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Bookings", {
      fields: ["seatId"],
      type: "foreign key",
      name: "fk-to-bookings-seatId",
      references: {
        table: "Seats",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Bookings", {
      fields: ["passangerId"],
      type: "foreign key",
      name: "fk-to-bookings-passangerId",
      references: {
        table: "Passangers",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Bookings", {
      fields: ["ticketId"],
      type: "foreign key",
      name: "fk-to-bookings-ticketId",
      references: {
        table: "Tickets",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Bookings", {
      fields: ["paymentId"],
      type: "foreign key",
      name: "fk-to-bookings-paymentId",
      references: {
        table: "Payments",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Bookings", "fk-to-bookings-userId");
    await queryInterface.removeConstraint("Bookings", "fk-to-bookings-seatId");
    await queryInterface.removeConstraint(
      "Bookings",
      "fk-to-bookings-passangerId"
    );
    await queryInterface.removeConstraint(
      "Bookings",
      "fk-to-bookings-ticketId"
    );
    await queryInterface.removeConstraint(
      "Bookings",
      "fk-to-bookings-paymentId"
    );
  },
};
