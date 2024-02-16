import Label from "./Label"
import Input from "./Input"
import Button from "./Button"
import styles from "./JoinGame.module.css";
import Wrapper from "./Wrapper";
import { ConnectionContext } from '../App';
import { useContext } from "react";
import { socket } from '../socket';

const JoinGame = () => {
  const {room, roomInput, setRoomInput} = useContext(ConnectionContext);

  function join(e, roomCode) {
    e.preventDefault();
    if (roomCode !== "") {
      socket.emit('leave', {
        room: room,
        username: "user"
      });
      socket.emit("validate_room", roomCode)
    }
  }

  return (
    <Wrapper>
      <form>
        <div className={styles.wrapper}>
          <Label for="code" className={styles.label}>
            enter invite code
          </Label>
          <Input 
            type="text" 
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)} 
            className={styles.input} 
            name="code" 
            placeholder="Enter invite code" 
          />
          <Button className={styles.submit} inverse onClick={ (e) => join(e, roomInput) } type="submit" >
            submit
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default JoinGame;