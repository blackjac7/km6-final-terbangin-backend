const router = require("express").Router();
const profileRoutes = require("./profile");
const ticketRoutes = require("./ticket");
const authRoutes = require("./auth");
const verificationRoutes = require("./verification");

router.use("/profile", profileRoutes);

router.use("/ticket", ticketRoutes);

router.use("/auth", authRoutes);

router.use("/verification", verificationRoutes);



module.exports = router;



