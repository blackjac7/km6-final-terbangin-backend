const router = require("express").Router();
const profileRoutes = require("./profile");
const airlineRoutes = require("./airline");
const airportRoutes = require("./airport");
const authRoutes = require("./auth");
const flightRoutes = require("./flight");
const seatRoutes = require("./seat");
const verificationRoutes = require("./verification");
const { authMiddleware } = require("../middlewares/auth");

router.use("/profile", authMiddleware, profileRoutes);

router.use("/flight", flightRoutes);

router.use("/seat", seatRoutes);

router.use("/airline", airlineRoutes);

router.use("/airport", airportRoutes);

router.use("/auth", authRoutes);

router.use("/verification", verificationRoutes);

module.exports = router;
