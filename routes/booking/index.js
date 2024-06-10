const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking");

router
  .route("/")
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

router
  .route("/id/:id")
  .get(bookingController.getBookingById)
  .put(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
