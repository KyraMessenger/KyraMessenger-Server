"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NewMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewMessage.belongsTo(models.User);
    }
  }
  NewMessage.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId cannot be empty",
          },
          notEmpty: {
            msg: "UserId cannot be empty",
          },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Message cannot be empty",
          },
          notEmpty: {
            msg: "Message cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "NewMessage",
    }
  );
  return NewMessage;
};
