import { useEffect, useRef } from "react";
import { useAppData } from "../../context/appContext";
import { SigninButton, SignupButton } from "./../LoginButtons/LoginButtons";
import { ReactComponent as TripleOval } from "../../assets/tripleOval.svg";
import { ReactComponent as Underline } from "../../assets/underline.svg";
import styles from "./MainBoard.module.css";

export default function MainBoard() {
  const { user } = useAppData();
  const section1TextRef = useRef(null);
  const section2TextRef = useRef(null);
  const tripleOvalRef = useRef(null);
  const underlineRef = useRef(null);
  // asignar nombre de usuario por el texto a la izquierda del correo antes de cualquiera de los signos de la validación
  const username = user?.email.split(/[@+.-_]/)[0];

  // asegurar que tripleOval mantenga la proprción con el texto correspondiente sin importar el tamaño de la pantalla
  useEffect(() => {
    const resizeHandler = () => {
      const textSize = parseFloat(
        window.getComputedStyle(section1TextRef.current).fontSize
      );
      tripleOvalRef.current.style.width = `${textSize * 4.6}px`;
      tripleOvalRef.current.style.height = `${textSize * 5}px`;
    };
    resizeHandler();
    // Agregar el controlador de eventos de redimensionamiento a la ventana
    window.addEventListener("resize", resizeHandler);
    // Eliminar el controlador de eventos de redimensionamiento cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // asegurar que underline mantenga la proprción con el texto correspondiente sin importar el tamaño de la pantalla
  useEffect(() => {
    const resizeHandler = () => {
      const textSize = parseFloat(
        window.getComputedStyle(section2TextRef.current).fontSize
      );
      underlineRef.current.style.width = `${textSize * 6}px`;
      underlineRef.current.style.height = textSize;
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.column1}>
        <section className={styles.section1}>
          <TripleOval
            color="rgba(255, 85, 18,0.5)"
            className={styles.tripleOval}
            ref={tripleOvalRef}
          />
          <p ref={section1TextRef}>
            start
            <br />
            <span style={{ color: "#FF5512" }}>streaming</span>
            <br />
            games
            <br />
            diferently
          </p>
        </section>
        <section className={styles.section2}>
          <p>gamor now has a</p>
          <p className={styles.highlightedText} ref={section2TextRef}>
            stream party
            <Underline color="#7644a0" ref={underlineRef} />
          </p>
          <p>platform</p>
        </section>
        <section className={styles.section3}>
          {!user ? (
            <>
              <SignupButton classN={styles.signup} />
              <SigninButton classN={styles.signin} />
            </>
          ) : (
            <p>Thank you for join us {username}!</p>
          )}
        </section>
      </div>
      <div className={styles.column2}></div>
      <div className={styles.column3}></div>
    </div>
  );
}
