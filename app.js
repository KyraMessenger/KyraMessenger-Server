if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const authentication = require("./middlewares/authentication");
const { NewMessage, User, Profile } = require("./models");

const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const { where } = require("sequelize");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

console.log(process.env.NODE_ENV || "development");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.emit("welcome", {
    message: "Welcome to the server",
    id: socket.id,
  });

  socket.on("send-message", async ({ message, from }) => {
    console.log("received message: ", message);
    console.log("from: ", from);

    const { dataValues } = await NewMessage.create({ message, UserId: from });

    const findNewMessage = await NewMessage.findOne({
      where: {
        id: dataValues.id,
      },
      include: {
        model: User,
        attributes: { exclude: ["password"] },
        include: Profile,
      },
    });

    // app.post("/room", authentication, async (req, res, next) => {
    //   try {
    //     const { id } = req.user;
    //     const { id2 } = req.body;
    //     const findRoom = await RoomMember.findOne({
    //       where: {
    //         UserId: id,
    //       },
    //     });
    //     if (findRoom) throw { name: "RoomAlreadyCreated" };
    //     const findRoom2 = await RoomMember.findOne({
    //       where: {
    //         UserId: id2,
    //       },
    //     });
    //     if (findRoom2) throw { name: "RoomAlreadyCreated" };
    //     await RoomMember.create({
    //       UserId: id,
    //     });
    //     await RoomMember.create({
    //       UserId: id2,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    console.log(findNewMessage.dataValues, "????");

    socket.broadcast.emit("new-message", findNewMessage.dataValues);
  });
});

app.use("/", require("./routers"));
app.use(require("./middlewares/errorHandler"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
