const express = require("express");
const router = express.Router();
const NotificationController = require("../../controllers/notification");

router
.route("/")
.post(NotificationController.createNotification);

router
.route("/:id")
.get(NotificationController.getNotification)
.put(NotificationController.updateNotification)
.delete(NotificationController.deleteNotification);

router.get("/user/:userId", NotificationController.getNotificationByUserId);
router.get("/booking/:bookingId", NotificationController.getNotificationByBookingId);

module.exports = router;
