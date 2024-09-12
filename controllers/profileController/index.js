const { where } = require("sequelize");
const { Profile } = require("../../models");

module.exports = class ProfileController {
  static async editProfile(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { fullName, profilePicture } = req.body;
      const dataId = await Profile.findOne({
        where: {
          UserId,
        },
      });

      if (!dataId) {
        throw { name: "NotFound" };
      }

      if (dataId.UserId != UserId) throw { name: "Unauthorized" };
      const data = await dataId.update(
        { fullName, profilePicture },
        {
          where: {
            UserId,
          },
          returning: true,
        }
      );
      res.status(200).json({ message: "Profile has been updated" });
    } catch (error) {
      next(error);
    }
  }
};
