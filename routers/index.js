const router = require("express").Router();

const auth = require("./authRoutes");
const room = require("./roomRoutes");
const checkLogin = require("../middlewares/authentication");
router.use("/", auth);
router.use(checkLogin);
router.use("/", room);
module.exports = router;
