const flightusecase = require("../../usecases/flight/index");
const { v4: uuidv4 } = require("uuid");
const isUUID = require("../../helpers/isUUID");

exports.getFlights = async (req, res, next) => {
  try {
    let { key, value, filter, order } = req.query;
    const list = [
      "airlineId",
      "startAirportId",
      "endAirportId",
      "priceEconomy",
      "priceBussines",
      "priceFirstClass",
      "departureAt",
      "arrivalAt",
      "duration",
    ];

    if (!filter) {
      filter = "priceEconomy";
    }
    if (!list.includes(filter)) {
      return next({
        message: "filter must include in selection and cannot be empty",
        statusCode: 400,
      });
    }

    if (!order) {
      order = "asc";
    }
    if (!(order.toLowerCase() == "asc" || order.toLowerCase() == "desc")) {
      return next({
        message: "order must be ASC or DESC",
        statusCode: 400,
      });
    }

    if (list.includes(key)) {
      if (!isUUID(value)) {
        return next({
          statusCode: 400,
          message: "userId must be a valid UUID",
        });
      }
    }

    const data = await flightusecase.getFlights(key, value, filter, order);

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

    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }

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
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
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
    if (!capacityFirstClass || capacityFirstClass == "") {
      return next({
        message: "capacityFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityEconomy || capacityEconomy == "") {
      return next({
        message: "capacityEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityBussines || capacityBussines == "") {
      return next({
        message: "capacityBussines must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.createFlight({
      id,
      airlineId,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
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
    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }
    const {
      airlineId,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
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
    if (!capacityFirstClass || capacityFirstClass == "") {
      return next({
        message: "capacityFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityEconomy || capacityEconomy == "") {
      return next({
        message: "capacityEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityBussines || capacityBussines == "") {
      return next({
        message: "capacityBussines must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.updateFlight(id, {
      airlineId,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
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
    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }
    const data = await flightusecase.deleteFlight(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
