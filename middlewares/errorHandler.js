module.exports = (error, req, res, next) => {
  console.log(error, "ADA ERROR!!!!!!!!!!!");
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    return res.status(400).json({
      message: error.errors[0].message,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  if (error.name === "InvalidUser") {
    return res
      .status(401)
      .json({ message: "Invalid email/username or password" });
  }
  if (error.name === "InvalidToken") {
    return res.status(403).json({ message: "Unauthenticated" });
  }
  if (error.name === "RoomAlreadyCreated") {
    return res.status(400).json({ message: "Room already exist" });
  }
  if (error.name === "Unauthorized") {
    return res
      .status(401)
      .json({ message: "You are not authorized to do this action" });
  }

  if (error.name === "notFound") {
    return res.status(404).json({
      message: "Error not found",
    });
  } else {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
