import styles from "./Input.module.css";

const Input = ({ className = "", ...props }) => (
  <input
    className={styles.input + " " + className}
    {...props}
  />
);

export default Input;