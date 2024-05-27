const router = require("express").Router();
const profileController = require("../../controllers/profile");

router.route("/id/:id")
    .get(profileController.getProfileById)
    .patch(profileController.updateProfileById)
    .delete(profileController.deleteProfileById);

router.get("/email/:email", profileController.getProfileByEmail);
router.get("/phone/:phoneNumber", profileController.getProfileByPhoneNumber);

module.exports = router;