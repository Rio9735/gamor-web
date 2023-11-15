import styles from "./GamorLogo.module.css";

export default function GamorLogo({ classN }) {
  return (
    <div className={`${styles.gamorLogo} ${classN ? classN : ""}`}>
      <div className={styles.blurCircle} />
      <h1>Gamor</h1>
    </div>
  );
}
