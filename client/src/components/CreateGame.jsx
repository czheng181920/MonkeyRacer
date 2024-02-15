import Label from "./Label"
import Input from "./Input"
import Button from "./Button"
import { Link } from "react-router-dom"
import styles from "./JoinGame.module.css";
import Wrapper from "./Wrapper";
import { ConnectionManager } from "./ConnectionManager";

const CreateGame = () => {
  return (
    <Wrapper>
      <ConnectionManager />
      <form>
        <div className={styles.wrapper}>
          <Label for="code" className={styles.label}>
            enter invite code
          </Label>
          <Input className={styles.input} name="code" placeholder="Enter invite code" />
          <Button className={styles.submit} type="submit" >
            submit
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default CreateGame;