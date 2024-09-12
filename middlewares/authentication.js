const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt.js");

module.exports = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;

    if (!access_token) throw { name: "InvalidToken" };

    const [bearer, token] = access_token.split(" ");
    if (!bearer) throw { name: "InvalidToken" };
    if (!token) throw { name: "InvalidToken" };

    const { userId } = verifyToken(token);

    const user = await User.findByPk(userId);
    if (!user) throw { name: "InvalidToken" };

    req.user = {
      id: user.id,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};
