const router = require("express").Router();
const RoomController = require("../../controllers/roomController");

router.post("/room", RoomController.createRoom);

module.exports = router;
