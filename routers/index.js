const router = require("express").Router();

const auth = require("./authRoutes");
const user = require("./userRoutes");

router.use("/", auth);
router.use("/", user);

module.exports = router;
