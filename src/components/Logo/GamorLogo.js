import { useAppData } from "../../context/appContext";
import styles from "./GamorLogo.module.css";

export default function GamorLogo({ classN }) {
  const { theme } = useAppData();
  return (
    <div className={`${styles.gamorLogo} ${classN ? classN : ""}`}>
      <div className={styles.blurCircle} />
      <h1 className={styles[`logoText${theme}`]}>Gamor</h1>
    </div>
  );
}
