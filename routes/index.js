const router = require("express").Router();
const profileRoutes = require("./profile");
const ticketRoutes = require("./ticket")
const authRoutes = require("./auth");


router.use("/profile", profileRoutes);

router.use("/ticket", ticketRoutes);

router.use("/auth", authRoutes);



module.exports = router;



