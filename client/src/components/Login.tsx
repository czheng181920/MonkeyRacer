import styles from "./Login.module.css"
import Button from "./Button";
import Label from "./Label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Monkey } from "../assets/Monkey";
const Login = () => {
  return (
    <div className={styles.wrapper} >
      <div className={styles.labelWrapper}>
        <Label>login</Label>
        <Monkey className={styles.icon}></Monkey>
      </div>
      <Button className={styles.button}>
        <FontAwesomeIcon icon={faGoogle} />
        <b> google sign in</b>
      </Button>
      <div className=""></div>
    </div>
  )
}

export default Login;