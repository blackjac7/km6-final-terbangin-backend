const router = require("express").Router();
const profileRoutes = require("./profile");
const authRoutes = require("./auth");
const flightRoutes = require("./flight");
const seatRoutes = require("./seat");
const verificationRoutes = require("./verification");
const paymentRoutes = require("./payment");
const { authMiddleware } = require("../middlewares/auth");

router.use("/profile", authMiddleware, profileRoutes);

router.use("/flight", flightRoutes);

router.use("/seat", seatRoutes);

router.use("/auth", authRoutes);

router.use("/verification", verificationRoutes);

router.use("/payment", authMiddleware, paymentRoutes);

module.exports = router;
