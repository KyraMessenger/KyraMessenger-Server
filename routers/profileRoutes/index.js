const router = require("express").Router();
const Profile = require("../../controllers/profileController");

router.put("/profile", Profile.editProfile);

module.exports = router;
