"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("helperBookings", {
      fields: ["passangerId"],
      type: "foreign key",
      name: "fk-to-helperBookings-passangerId",
      references: {
        table: "Passangers",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("helperBookings", {
      fields: ["bookingId"],
      type: "foreign key",
      name: "fk-to-helperBookings-bookingId",
      references: {
        table: "Bookings",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("helperBookings", {
      fields: ["seatId"],
      type: "foreign key",
      name: "fk-to-helperBookings-seatId",
      references: {
        table: "Seats",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "helperBookings",
      "fk-to-helperBookings-passangerId"
    );
    await queryInterface.removeConstraint(
      "helperBookings",
      "fk-to-helperBookings-bookingId"
    );
    await queryInterface.removeConstraint(
      "helperBookings",
      "fk-to-helperBookings-seatId"
    );
  },
};
