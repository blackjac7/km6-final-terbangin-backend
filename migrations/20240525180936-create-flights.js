"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Flights", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            airlineId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            startAirportId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            endAirportId: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            capacity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            departureAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            arrivalAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            priceEconomy: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            priceBussines: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            priceFirstClass: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            deletedAt: {
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
        await queryInterface.dropTable("Flights");
    },
};
