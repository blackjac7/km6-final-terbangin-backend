const router = require("express").Router();
const paymentController = require("../../controllers/payment/index");

router.route("/").post(paymentController.addPayment);
router
    .route("/id/:id")
    .get(paymentController.getPaymentById)
    .delete(paymentController.deletePaymentById)
    .patch(paymentController.updatePaymentById);
router.get("/userId/:userId", paymentController.getPaymentsByUserId);

module.exports = router;
