const router = require("express").Router();
const { register, profile } = require("../../controllers/auth");
const { login, googleLogin } = require("../../controllers/login");
const { authMiddleware } = require("../../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", authMiddleware, profile);

module.exports = router;
