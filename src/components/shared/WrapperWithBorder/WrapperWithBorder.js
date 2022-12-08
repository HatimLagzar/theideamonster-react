import styles from "./WrapperWithBorder.module.css";

export default function WrapperWithBorder(props) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
