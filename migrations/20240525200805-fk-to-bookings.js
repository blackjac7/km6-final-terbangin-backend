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
        await queryInterface.removeConstraint(
            "Bookings",
            "fk-to-bookings-userId"
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
