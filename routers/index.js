const router = require("express").Router();

const auth = require("./authRoutes");
const room = require("./roomRoutes");
const user = require("./userRoutes");
const profile = require("./profileRoutes");
const checkLogin = require("../middlewares/authentication");
const { NewMessage, User, Profile } = require("../models");

router.use("/", auth);
router.use(checkLogin);
router.use("/", user);
router.get("/message", async (req, res, next) => {
  try {
    const messages = await NewMessage.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password"] },
        include: Profile,
      },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
});
// router.use("/", room);
router.use("/", profile);

module.exports = router;
