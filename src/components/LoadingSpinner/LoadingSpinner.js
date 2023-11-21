import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ size, border }) {
  return (
    <div
      className={styles.loadingSpinner}
      style={{
        height: size && `${size}vh`,
        width: size && `${size}vh`,
        border: border && `${border}vh solid var(--color1)`,
        borderTop: border && `${border}vh solid var(--color9)`,
      }}
    />
  );
}
