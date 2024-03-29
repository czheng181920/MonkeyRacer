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
        <Link to="/">
          <h1 className={styles.headingTitle}>monkeyracer</h1>
        </Link>
      </div>
      <Link to="login">
        <FontAwesomeIcon icon={faUser} className={styles.link}/>
      </Link>
    </header>
  )
}

export default Header;