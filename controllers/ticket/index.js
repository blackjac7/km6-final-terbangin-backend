const Ticketusecase = require("../../usecases/ticket/index");
const { v4: uuidv4 } = require("uuid");

exports.getTickets = async (req, res, next) => {
  try {
    const data = await Ticketusecase.getTickets();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Ticketusecase.getTicket(id);
    if (!data) {
      return next({
        message: `Ticket with id ${id} is not found!`,
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

exports.getTicketsByFlight = async (req, res, next) => {
  try {
    const data = await Ticketusecase.getTicketsByFlight();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    const id = uuidv4();
    const { flightId, totalPrice, } = req.body;
    if (!flightId || flightId == "") {
      return next({
        message: "flight id must be provided!",
        statusCode: 400,
      });
    }
    if (!totalPrice || totalPrice == "") {
      return next({
        message: "price must be provided!",
        statusCode: 400,
      });
    }
    

    const data = await Ticketusecase.createTicket({
      id,
      flightId,
      totalPrice,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flightId, totalPrice } = req.body;
    if (!flightId || flightId == "") {
      return next({
        message: "flight id must be provided!",
        statusCode: 400,
      });
    }
    if (!totalPrice || totalPrice == "") {
      return next({
        message: "price must be provided!",
        statusCode: 400,
      });
    }
    

    const data = await Ticketusecase.updateTicket(id, {
      flightId,
      totalPrice,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Ticketusecase.deleteTicket(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
