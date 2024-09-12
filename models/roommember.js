"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomMember.belongsTo(models.User);
      RoomMember.belongsTo(models.Room);
    }
  }
  RoomMember.init(
    {
      RoomId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RoomMember",
    }
  );
  RoomMember.beforeCreate(async (roomMember) => {
    const { Room } = sequelize.models;
    const room = await Room.create({});
    roomMember.RoomId = room.id;
  });
  return RoomMember;
};
