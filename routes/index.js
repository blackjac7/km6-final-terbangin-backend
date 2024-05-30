const router = require('express').Router();

const profileRoutes = require("./profile");
const ticketRoutes = require("./ticket")

router.use("/profile", profileRoutes);

router.use("/ticket", ticketRoutes);

module.exports = router;