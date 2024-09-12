const { where, Op } = require("sequelize");
const { User } = require("../../models");

module.exports = class UserId {
  static async findUserByPk(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },

        include: "Profile",
      });
      if (!user) {
        return "User Not Found";
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async findLoggedInUser(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },

        include: "Profile",
      });
      if (!user) {
        return "User Not Found";
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async findAllUser(req, res, next) {
    const { id } = req.user;

    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: "Profile",
      where: {
        id: {
          [Op.ne]: id,
        },
      },
    });

    return res.status(200).json(users);
  }
};
