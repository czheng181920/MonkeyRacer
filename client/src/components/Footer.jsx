import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Label from "./Label"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/czheng181920/MonkeyRacer">
        <FontAwesomeIcon icon={faGithub} />
        <Label className={styles.label}>Github</Label>
      </a>
    </footer>
  )
}

export default Footer;