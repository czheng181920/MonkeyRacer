import styles from "./Wrapper.module.css"

const Wrapper = ({className="", children}) => {
  return (
    <div className={styles.wrapper + " " + className}>{children}</div>
  )
}

export default Wrapper;