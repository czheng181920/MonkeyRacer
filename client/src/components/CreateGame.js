import React from "react";
import { socket } from "../socket";

export function CreateGame({ updateRoomCode }) {
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function createGame() {
    const roomCode = makeid(8);
    updateRoomCode(roomCode);
    socket.emit("create_room", {
      room: roomCode,
    });
  }

  return (
    <>
      <button onClick={createGame}>Create game</button>
    </>
  );
}
