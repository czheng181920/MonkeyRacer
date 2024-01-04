import React from "react";
import { socket } from "../socket";

export function LeaveGame(props) {
  function leave() {
    socket.emit("leave", {
      room: props.room,
      username: "user",
    });
    props.updateRoomCode("");
    window.location.reload();
  }

  return <button onClick={leave}>Leave room</button>;
}
