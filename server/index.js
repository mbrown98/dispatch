const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { callbackify } = require("util");

const app = express();

const PORT = process.env.port || 5000;

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection!");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the ${user.room} room`,
    });
    //sends message to everyone but the new user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
    socket.join(user.room);
    callback();
  });
  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
