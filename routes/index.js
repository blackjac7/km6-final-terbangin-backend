const router = require("express").Router();
const profileRoutes = require("./profile");
const passangerRoutes = require("./passanger");
const airlineRoutes = require("./airline");
const airportRoutes = require("./airport");
const authRoutes = require("./auth");
const flightRoutes = require("./flight");
const seatRoutes = require("./seat");
const helperBookingRoutes = require("./helperBooking");
const verificationRoutes = require("./verification");
const paymentRoutes = require("./payment");
const { authMiddleware } = require("../middlewares/auth");

router.use("/auth", authRoutes);

router.use("/profile", authMiddleware, profileRoutes);

router.use("/passanger", authMiddleware, passangerRoutes);

router.use("/flight", flightRoutes);

router.use("/seat", seatRoutes);

router.use("/airline", airlineRoutes);

router.use("/airport", airportRoutes);

router.use("/helper-booking", authMiddleware, helperBookingRoutes);

router.use("/verification", verificationRoutes);

router.use("/payment", authMiddleware, paymentRoutes);

module.exports = router;
