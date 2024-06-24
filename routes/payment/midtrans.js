const router = require("express").Router();
const paymentController = require("../../controllers/payment/index");
const baseEndpoint = "/midtrans";

router.post(
    `${baseEndpoint}/notification`,
    paymentController.handleMidtransNotification
);

module.exports = router;
