import styles from "./Label.module.css";

const Label = ({ className = "", for: htmlFor = "", children }) => (
  <label for={htmlFor} className={styles.label + " " + className}>{children}</label>
);

export default Label;
