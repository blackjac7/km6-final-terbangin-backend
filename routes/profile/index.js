const router = require("express").Router();
const profileController = require("../../controllers/profile");
const { authMiddleware } = require("../../middlewares/auth");

router
    .route("/id/:id")
    .get(authMiddleware, profileController.getProfileById)
    .patch(authMiddleware, profileController.updateProfileById)
    .delete(authMiddleware, profileController.deleteProfileById);

router.get(
    "/email/:email",
    authMiddleware,
    profileController.getProfileByEmail
);
router.get(
    "/phone/:phoneNumber",
    authMiddleware,
    profileController.getProfileByPhoneNumber
);

module.exports = router;
