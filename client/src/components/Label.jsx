import styles from "./Label.module.css";

const Label = ({ className = "", children }) => (
  <label className={styles.label + " " + className}>{children}</label>
);

export default Label;
