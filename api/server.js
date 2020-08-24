const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/authRouter.js");
const authMW = require("../middleware/authMW.js");
const userRouter = require("../users/usersRouter.js");
const songRouter = require("../songs/songsRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/users", authMW, userRouter);
server.use("/songs", authMW, songRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server running :)" });
});

module.exports = server;
