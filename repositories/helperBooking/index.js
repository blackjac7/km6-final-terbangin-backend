const {
    HelperBookings,
    Passangers,
    Seats,
    Bookings,
    Flights,
    Payments,
} = require("../../models");
const { v4: uuidv4 } = require("uuid");

exports.createHelperBooking = async (payload) => {
    const id = uuidv4();

    payload = {
        id,
        ...payload,
    };
    const data = await HelperBookings.create(payload);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to create helper booking",
        };
    }

    return data;
};

exports.getHelperBookingById = async (id) => {
    const opt = {
        include: [
            Passangers,
            {
                model: Seats,
                include: [Flights],
            },
            {
                model: Bookings,
                include: [Payments],
            },
        ],
    };

    const data = await HelperBookings.findByPk(id, opt);

    if (!data) {
        throw {
            statusCode: 404,
            message: `Helper booking with ID ${id} not found`,
        };
    }

    return data;
};

exports.getHelperBookingByPassangerId = async (passangerId) => {
    const opt = {
        where: {
            passangerId,
        },
        include: [
            Passangers,
            {
                model: Seats,
                include: [Flights],
            },
            {
                model: Bookings,
                include: [Payments],
            },
        ],
    };

    const data = await HelperBookings.findAll(opt);

    if (!data || data.length === 0) {
        throw {
            statusCode: 404,
            message: `Helper booking with passanger ID ${passangerId} not found`,
        };
    }

    return data;
};

exports.getHelperBookingByBookingId = async (bookingId) => {
    const opt = {
        where: {
            bookingId,
        },
        include: [
            Passangers,
            {
                model: Seats,
                include: [Flights],
            },
            {
                model: Bookings,
                include: [Payments],
            },
        ],
    };

    const data = await HelperBookings.findAll(opt);

    if (!data || data.length === 0) {
        throw {
            statusCode: 404,
            message: `Helper booking with booking ID ${bookingId} not found`,
        };
    }

    return data;
};

exports.getHelperBookingBySeatId = async (seatId) => {
    const opt = {
        where: {
            seatId,
        },
        include: [
            Passangers,
            {
                model: Seats,
                include: [Flights],
            },
            {
                model: Bookings,
                include: [Payments],
            },
        ],
    };

    const data = await HelperBookings.findAll(opt);

    if (!data || data.length === 0) {
        throw {
            statusCode: 404,
            message: `Helper booking with seat ID ${seatId} not found`,
        };
    }

    return data;
};

exports.updateHelperBooking = async (id, payload) => {
    await this.getHelperBookingById(id);

    const opt = {
        where: {
            id,
        },
        returning: true,
    };

    const data = await HelperBookings.update(payload, opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to update helper booking",
        };
    }

    return data[1][0];
};

exports.deleteHelperBookingById = async (id) => {
    const toBeDeleted = await this.getHelperBookingById(id);

    const opt = {
        where: {
            id,
        },
        force: true,
    };

    const data = await HelperBookings.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to delete helper booking",
        };
    }

    return toBeDeleted;
};

exports.deleteHelperBookingByPassangerId = async (passangerId) => {
    await this.getHelperBookingByPassangerId(passangerId);

    const opt = {
        where: {
            passangerId,
        },
        force: true,
    };

    const data = await HelperBookings.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to delete helper booking",
        };
    }

    return data;
};

exports.deleteHelperBookingByBookingId = async (bookingId) => {
    await this.getHelperBookingByBookingId(bookingId);

    const opt = {
        where: {
            bookingId,
        },
        force: true,
    };

    const data = await HelperBookings.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to delete helper booking",
        };
    }

    return data;
};

exports.deleteHelperBookingBySeatId = async (seatId) => {
    await this.getHelperBookingBySeatId(seatId);

    const opt = {
        where: {
            seatId,
        },
        force: true,
    };

    const data = await HelperBookings.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to delete helper booking",
        };
    }

    return data;
};
