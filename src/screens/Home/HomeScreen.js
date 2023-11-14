import { useEffect, useState } from "react";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import MainBoard from "../../components/MainBoard/MainBoard";
import styles from "./HomeScreen.module.css";

export default function HomeScreen() {
  const [show, setShow] = useState(false);

  // Escucha el scroll, actualiza "show" si se ha hecho scroll. "show" será "true" al hacer scroll hacia abajo y "false" al hacer scroll hacia arriba
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // *** Desplaza la vista al final si "show" es "true", o al inicio si es "false".
  // useEffect(() => {
  //   window.scrollTo({
  //     top: show ? document.body.scrollHeight : 0,
  //     behavior: "smooth",
  //   });
  // }, [show]);

  return (
    <div className={`${styles.container} ${styles.transition}`}>
      <section className={`${styles.transition} ${show && styles.moveUp}`}>
        <MainBoard />
      </section>
      <section className={`${styles.transition} ${show && styles.moveUp}`}>
        <CategoriesSection />
      </section>
    </div>
  );
}
