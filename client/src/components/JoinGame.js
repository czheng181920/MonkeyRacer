import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export function JoinGame({ updateRoomCode }) {
  const [roomInput, setRoomInput] = useState("");

  useEffect(() => {
    socket.on("valid_room", () => {
      updateRoomCode(roomInput);
      socket.emit("join", {
        room: roomInput,
        username: "user",
      });
    });

    socket.on("invalid_room", () => {
      updateRoomCode(roomInput);
      socket.emit("create_room", {
        room: roomInput,
      });
    });
  });

  function join(e, roomCode) {
    e.preventDefault();
    if (roomCode != "") {
      socket.emit("validate_room", roomCode);
      updateRoomCode(roomCode);
    }
  }

  return (
    <form>
      <input
        type="text"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
      />
      <button onClick={(e) => join(e, roomInput)}>Join room</button>
    </form>
  );
}
