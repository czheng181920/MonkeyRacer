import styles from "./Main.module.css";
import Button from "./Button";
import Label from "./Label";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <Label className={styles.label}>welcome to monkeyracer</Label>
        <Link className={styles.create} to="/create">
          <Button className={styles.button}>create game</Button>
        </Link>
        <Link className={styles.join} to="/join">
          <Button className={styles.button}>join game</Button>
        </Link>
      </div>
    </div>
  )
}

export default Main;