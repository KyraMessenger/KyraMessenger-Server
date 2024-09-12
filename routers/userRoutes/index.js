const router = require("express").Router();
const UserId = require("../../controllers/userController");

router.get("/user", UserId.findLoggedInUser);
router.get("/user/all", UserId.findAllUser);
router.get("/user/:id", UserId.findUserByPk);

module.exports = router;
