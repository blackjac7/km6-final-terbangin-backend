const seatUsecase = require("../../usecases/seat/index");
const { v4: uuidv4 } = require("uuid");

exports.getSeats = async (req, res, next) => {
  try {
    const data = await seatUsecase.getSeats();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSeatbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await seatUsecase.getSeatbyId(id);
    if (!data) {
      return next({
        message: `Seat with id ${id} is not found!`,
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

exports.getSeatbyTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await seatUsecase.getSeatbyTicket(id);
    if (!data) {
      return next({
        message: `Seat with ticket-id:${id} is not found!`,
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

exports.createSeat = async (req, res, next) => {
  try {
    const id = uuidv4();
    const { ticketId, seatNumber, airlineClass, isAvailable } = req.body;
    if (!ticketId || ticketId == "") {
      return next({
        message: "Ticket id must be provided!",
        statusCode: 400,
      });
    };
    if (!seatNumber || seatNumber == "") {
      return next({
        message: "seat Number must be provided!",
        statusCode: 400,
      });
    };
    if (!airlineClass || airlineClass == "") {
      return next({
        message: "airlineClass must be provided!",
        statusCode: 400,
      });
    };
    if (!isAvailable || isAvailable == "") {
      return next({
        message: "status isAvailable must be provided!",
        statusCode: 400,
      });
    };

    const data = await seatUsecase.createSeat({
      id,
      ticketId,
      seatNumber,
      airlineClass,
      isAvailable
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
    };
    if (!seatNumber || seatNumber == "") {
      return next({
        message: "seat Number must be provided!",
        statusCode: 400,
      });
    };
    if (!airlineClass || airlineClass == "") {
      return next({
        message: "airlineClass must be provided!",
        statusCode: 400,
      });
    };
    if (!isAvailable || isAvailable == "") {
      return next({
        message: "status isAvailable must be provided!",
        statusCode: 400,
      });
    };

    const data = await seatUsecase.updateSeat(id, {
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
    const data = await seatUsecase.deleteSeat(id);

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
    const data = await seatUsecase.deleteSeatbyTicket(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};