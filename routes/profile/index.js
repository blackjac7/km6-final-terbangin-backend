const router = require("express").Router();
const profileController = require("../../controllers/profile");

router.route("/:id")
    .get(profileController.getProfileById)
    .patch(profileController.updateProfileById)
    .delete(profileController.deleteProfileById);

module.exports = router;