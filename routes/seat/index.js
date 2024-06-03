const express = require("express");
const router = express.Router();
const seatController = require("../../controllers/seat");

router
  .route("/seat-with-ticket-id/:id") 
  .get(seatController.getSeatbyTicket)
  .delete(seatController.deleteSeatbyTicket)

router
  .route("/")
  .get(seatController.getSeats)
  .post(seatController.createSeat);

router
  .route("/id/:id")
  .get(seatController.getSeatbyId)
  .put(seatController.updateSeat)
  .delete(seatController.deleteSeat);

module.exports = router;
