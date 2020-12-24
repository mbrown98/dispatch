import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    // socket = io(ENDPOINT);
    socket = io("http://localhost:5000", { transports: ["websocket"] });
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <h1>Chat</h1>;
};

export default Chat;
