const router = require("express").Router();
const profileRoutes = require("./profile");
const ticketRoutes = require("./ticket");
const authRoutes = require("./auth");
const verificationRoutes = require("./verification");
const paymentRoutes = require("./payment");
const { authMiddleware } = require("../middlewares/auth");

router.use("/profile", authMiddleware, profileRoutes);

router.use("/ticket", ticketRoutes);

router.use("/auth", authRoutes);

router.use("/verification", verificationRoutes);

router.use("/payment", authMiddleware, paymentRoutes);

module.exports = router;
