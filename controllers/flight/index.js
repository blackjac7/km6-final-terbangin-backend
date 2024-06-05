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
    if (!duration || duration == "") {
      return next({
        message: "Duration must be provided!",
        statusCode: 400,
      });
    }
    if (!startAirportId || startAirportId == "") {
      return next({
        message: "startAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!endAirportId || endAirportId == "") {
      return next({
        message: "endAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == "") {
      return next({
        message: "capacity must be provided!",
        statusCode: 400,
      });
    }
    if (!departureAt || departureAt == "") {
      return next({
        message: "departureAt must be provided!",
        statusCode: 400,
      });
    }
    if (!arrivalAt || arrivalAt == "") {
      return next({
        message: "arrivalAt must be provided!",
        statusCode: 400,
      });
    }
    if (!priceEconomy || priceEconomy == "") {
      return next({
        message: "priceEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!priceBussines || priceBussines == "") {
      return next({
        message: "priceBussines must be provided!",
        statusCode: 400,
      });
    }
    if (!priceFirstClass || priceFirstClass == "") {
      return next({
        message: "priceFirstClass must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.createFlight({
      id,
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
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    if (!duration || duration == "") {
      return next({
        message: "Duration must be provided!",
        statusCode: 400,
      });
    }
    if (!startAirportId || startAirportId == "") {
      return next({
        message: "startAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!endAirportId || endAirportId == "") {
      return next({
        message: "endAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == "") {
      return next({
        message: "capacity must be provided!",
        statusCode: 400,
      });
    }
    if (!departureAt || departureAt == "") {
      return next({
        message: "departureAt must be provided!",
        statusCode: 400,
      });
    }
    if (!arrivalAt || arrivalAt == "") {
      return next({
        message: "arrivalAt must be provided!",
        statusCode: 400,
      });
    }
    if (!priceEconomy || priceEconomy == "") {
      return next({
        message: "priceEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!priceBussines || priceBussines == "") {
      return next({
        message: "priceBussines must be provided!",
        statusCode: 400,
      });
    }
    if (!priceFirstClass || priceFirstClass == "") {
      return next({
        message: "priceFirstClass must be provided!",
        statusCode: 400,
      });
    }
    const data = await flightusecase.updateFlight(id, {
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
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flightusecase.deleteFlight(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

