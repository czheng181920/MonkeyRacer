import styles from "./Header.module.css";
import { Monkey } from "../assets/Monkey";
import Label from "./Label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <Link to="/">
          <Monkey className={styles.monkey}></Monkey>
        </Link>
        <Label className={styles.headingTitle}>monkeyracer</Label>
      </div>
      <Link to="login">
        <FontAwesomeIcon icon={faUser} className={styles.link}/>
      </Link>
    </header>
  )
}

export default Header;