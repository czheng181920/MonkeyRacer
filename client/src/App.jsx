import React, { useState, useEffect } from "react";
import "./App.css";
import TextForm from "./components/TextForm";
import { socket } from "./socket";
import { CreateGame } from "./components/CreateGame";
import { JoinGame } from "./components/JoinGame";
import { LeaveGame } from "./components/LeaveGame";

function App() {
  const [passage, setPassage] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const updateRoomCode = (code) => {
    setRoomCode(code);
  };

  useEffect(() => {
    socket.on("setup_game", (words) => {
      setPassage(words.join(" "));
    });

    socket.on("incorrect_input", (data) => {
      console.log(data);
    });

    socket.on("correct_input", () => {});
  }, []);

  return (
    <>
      {roomCode == "" ? (
        <>
          <CreateGame updateRoomCode={updateRoomCode} />{" "}
          <JoinGame updateRoomCode={updateRoomCode} />
        </>
      ) : (
        <LeaveGame room={roomCode} updateRoomCode={updateRoomCode} />
      )}
      <div className="temp">
        <br />
        {roomCode != "" ? (
          <>
            {roomCode} <br />{" "}
          </>
        ) : (
          <></>
        )}{" "}
        {passage}
        <TextForm passage={passage} />
      </div>
    </>
  );
}

export default App;
