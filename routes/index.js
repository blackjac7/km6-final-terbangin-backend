const router = require("express").Router();
const profileRoutes = require("./profile");
const ticketRoutes = require("./ticket");
const airlineRoutes = require("./airline");
const authRoutes = require("./auth");
const verificationRoutes = require("./verification");
const { authMiddleware } = require("../middlewares/auth");

router.use("/profile", authMiddleware, profileRoutes);

router.use("/ticket", ticketRoutes);

router.use("/airline", airlineRoutes);

router.use("/auth", authRoutes);

router.use("/verification", verificationRoutes);

module.exports = router;
