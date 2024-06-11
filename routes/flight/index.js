const express = require("express");
const router = express.Router();
const flightController = require("../../controllers/flight");

router
  .route("/")
  .get(flightController.getFlights)
  .post(flightController.createFlight);

router
  .route("/id/:id")
  .get(flightController.getFlightbyId)
  .put(flightController.updateFlight)
  .delete(flightController.deleteFlight);

module.exports = router;
