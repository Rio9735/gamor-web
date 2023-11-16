import { useAppData } from "../../context/appContext";
import styles from "./GamorLogo.module.css";

export default function GamorLogo({ classN }) {
  const { darkTheme } = useAppData();
  return (
    <div className={`${styles.gamorLogo} ${classN ? classN : ""}`}>
      <div className={styles.blurCircle} />
      <h1 className={darkTheme ? styles.logoTextDark : styles.logoTextLight}>
        Gamor
      </h1>
    </div>
  );
}
