import styles from "./Main.module.css";
import Button from "./Button";
import Label from "./Label";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ConnectionContext } from "../App";
import { socket } from '../socket';

const Main = () => {
  const {room, setRoom, roomInput, setRoomInput} = useContext(ConnectionContext);
  function join(roomCode) {
    if (roomCode !== "") {
      socket.emit('leave', {
        room: room,
        username: "user"
      });
      socket.emit("validate_room", roomCode)
    }
  }

  function leave() {
    socket.emit('leave', {
      room: room,
      username: "user"
    });
    setRoom("");
    window.location.reload();
  }

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function createRoom() {
    const roomCode = makeid(8);
    setRoom(roomCode);
    setRoomInput(roomCode);
    socket.emit('create_room', {
        room: roomCode,
    });
  }

  function createAndJoinRoom(e){
    createRoom();
    join(roomInput);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <Label className={styles.label}>welcome to monkeyracer</Label>
        <Link className={styles.create} to="/game">
          <Button className={styles.button} onClick={(e) => createAndJoinRoom(e)}>create game</Button>
        </Link>
        <Link className={styles.join} to="/join">
          <Button className={styles.button}>join game</Button>
        </Link>
      </div>
    </div>
  )
}

export default Main;