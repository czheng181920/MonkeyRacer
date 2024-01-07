import styles from "./Button.module.css";

const Button = ({ className = "", ...props }) => (
  <button
    className={styles.button + " " + className}
    {...props}
  />
);

export default Button;