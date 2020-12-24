const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();

const PORT = process.env.port || 5000;

const server = http.createServer(app);

const io = socketio(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
