import Label from "./Label"
import Input from "./Input"
import Button from "./Button"
import styles from "./Game.module.css";
import Wrapper from "./Wrapper";
import { ConnectionContext } from '../App';
import { useContext, useState } from "react";
import { socket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Word from "./Word";

const Game = () => {
  const {room, setRoom, roomInput, setRoomInput} = useContext(ConnectionContext);
  const fillerTextPrev = "Pokemon are the best wah wah wah wah yeah yeah yeah wah wah wah wah wah wah     "; //filler text while the game text creation function has not yet been implemented
  const fillerText = fillerTextPrev.split(' ');
  const [userInput, setUserInput] = useState("");

  //maybe use useMemo hook here to cache the calculation?
  const userInputArray = userInput.split(' ').filter(a => a.length > 0);
  //maybe use useMemo hook here to cache the calculation?
  const displayText = fillerText.map((word, index) => (
    <div className={styles.word}>
      <Word className={styles.word} key={index} targetWord={word} inputWord={userInputArray[index] ? userInputArray[index] : ""}/>
    </div>
  ));
  

  function leave() {
    socket.emit('leave', {
      room: room,
      username: "user"
    });
    setRoom("");
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomInput)
      .then(() => {
        console.log('Text copied to clipboard:', roomInput);
        // You can also provide user feedback here, such as showing a success message
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
        // Handle errors, such as browser compatibility or permission issues
      });
  };
  
  return (
    <Wrapper>
      <form>
       <div className={styles.wrapper}>
          <div className={styles.displayText}>
            {displayText}
            <Input className={styles.invisibleInput} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          </div>
          <Label className={styles.copyLabel} for="copy">
            copy room code:
          </Label>
          <div className={styles.roomCode}>
            <Input className={styles.input} type="text" value={roomInput} disabled onChange={(e) => setRoomInput(e.target.value)} />
            <Button type="button" inverse onClick={ handleCopyClick }>
              <FontAwesomeIcon icon={faCopy} className={styles.link}/>
            </Button>
          </div>
          <div className={styles.leaveRoom}>
            <Link to="/">
              <Button className={styles.button} inverse onClick={ leave } disabled={room === ""}>Leave room</Button>
            </Link>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default Game;