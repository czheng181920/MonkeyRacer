import styles from "./Button.module.css";

const Button = ({ className = "", inverse=false, ...props }) => {
  console.log("hello",inverse)
  return (
    inverse 
      ? 
      <button 
        className={styles.button + " " + styles.inverse + " " + className} 
        {...props} 
      /> 
      :
      <button
        className={styles.button + " " + className}
        {...props}
      />
  )
};

export default Button;