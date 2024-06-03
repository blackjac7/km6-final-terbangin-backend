const flightusecase = require("../../usecases/flight/index");
const { v4: uuidv4 } = require("uuid");

exports.getFlights = async (req, res, next) => {
  try {
    const data = await flightusecase.getFlights();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFlightbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flightusecase.getFlightbyId(id);
    if (!data) {
      return next({
        message: `Flight with this id :${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createFlight = async (req, res, next) => {
  try {
    const id = uuidv4();
    const {
      airlineId,
      duration,
      startAirportId,
      endAirportId,
      capacity,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
    } = req.body;
    if (!airlineId || airlineId == "") {
      return next({
        message: "Airline id must be provided!",
        statusCode: 400,
      });
    }
    if (!seatNumber || seatNumber == "") {
      return next({
        message: "seat Number must be provided!",
        statusCode: 400,
      });
    }
    if (!airlineClass || airlineClass == "") {
      return next({
        message: "airlineClass must be provided!",
        statusCode: 400,
      });
    }
    if (!isAvailable || isAvailable == "") {
      return next({
        message: "status isAvailable must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.createFlight({
      id,
      ticketId,
      seatNumber,
      airlineClass,
      isAvailable,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateSeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ticketId, seatNumber, airlineClass, isAvailable } = req.body;
    if (!ticketId || ticketId == "") {
      return next({
        message: "Ticket id must be provided!",
        statusCode: 400,
      });
    }
    if (!seatNumber || seatNumber == "") {
      return next({
        message: "seat Number must be provided!",
        statusCode: 400,
      });
    }
    if (!airlineClass || airlineClass == "") {
      return next({
        message: "airlineClass must be provided!",
        statusCode: 400,
      });
    }
    if (!isAvailable || isAvailable == "") {
      return next({
        message: "status isAvailable must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.updateSeat(id, {
      ticketId,
      seatNumber,
      airlineClass,
      isAvailable,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flightusecase.deleteSeat(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteSeatbyTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flightusecase.deleteSeatbyTicket(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
