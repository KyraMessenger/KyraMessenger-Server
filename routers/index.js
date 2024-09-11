const router = require("express").Router();

const auth = require("./authRoutes");
const room = require("./roomRoutes");
const user = require("./userRoutes");
const profile = require("./profileRoutes");
const checkLogin = require("../middlewares/authentication");

router.use("/", auth);
router.use(checkLogin);
router.use("/", user);
router.use("/", room);
router.use("/", profile);

module.exports = router;
