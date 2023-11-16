import { useAppData } from "../../context/appContext";
import styles from "./NotFoundScreen.module.css";

export default function NotFoundScreen() {
  const { darkTheme } = useAppData();
  return (
    <div className={styles.container}>
      <h1 className={darkTheme ? styles.textDark : styles.textLight}>
        Error 404. Page not found
      </h1>
    </div>
  );
}
