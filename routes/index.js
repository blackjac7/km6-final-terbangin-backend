const router = require("express").Router();
const profileRoutes = require("./profile");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

module.exports = router;



