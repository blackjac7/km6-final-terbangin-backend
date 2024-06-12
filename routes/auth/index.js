const router = require("express").Router();
const { register, login, googleLogin, profile } = require("../../controllers/auth");
const { authMiddleware } = require("../../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", authMiddleware, profile);

module.exports = router;
