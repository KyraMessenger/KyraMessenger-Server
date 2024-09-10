const { Room, RoomMember } = require("../../models");
const roommember = require("../../models/roommember");

class RoomController {
  static async createRoom(req, res, next) {
    try {
      const { id } = req.user;
      const { id2 } = req.body;
      const findRoom = await RoomMember.findOne({
        where: {
          UserId: id,
        },
      });
      if (findRoom) throw { name: "RoomAlreadyCreated" };
      const findRoom2 = await RoomMember.findOne({
        where: {
          UserId: id2,
        },
      });
      if (findRoom2) throw { name: "RoomAlreadyCreated" };
      await RoomMember.create({
        UserId: id,
      });
      await RoomMember.create({
        UserId: id2,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
