import styles from "./Main.module.css";
import Button from "./Button";
import Label from "./Label";
const Main = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <Label className={styles.label}>welcome to monkeyracer</Label>
        <Button className={styles.create}>create game</Button>
        <Button className={styles.join}>join game</Button>
      </div>
    </div>
  )
}

export default Main;