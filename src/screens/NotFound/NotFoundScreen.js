import { useAppData } from "../../context/appContext";
import styles from "./NotFoundScreen.module.css";

export default function NotFoundScreen() {
  const { theme } = useAppData();
  return (
    <div className={styles.container}>
      <h1 className={styles[`text${theme}`]}>Error 404. Page not found</h1>
    </div>
  );
}
