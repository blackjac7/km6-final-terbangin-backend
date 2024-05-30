const router = require("express").Router();
const { register } = require("../../controllers/auth");
const { login, googleLogin } = require("../../controllers/login")

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);

module.exports = router;
