import { useCallback, useEffect, useRef } from "react";
import { useAppData } from "../../context/appContext";
import { SigninButton, SignupButton } from "./../LoginButtons/LoginButtons";
import { ReactComponent as TripleOval } from "../../assets/svg/tripleOval.svg";
import { ReactComponent as Underline } from "../../assets/svg/underline.svg";
import { ReactComponent as AddUser } from "../../assets/svg/addUser.svg";
import { ReactComponent as Heart } from "../../assets/svg/heart.svg";
import { ReactComponent as Vector1 } from "../../assets/svg/vector1.svg";
import img1 from "../../assets/fortnite/fortnite7.png";
import img2 from "../../assets/fortnite/fortnite8.png";
import img3 from "../../assets/fortnite/fortnite1.png";
import styles from "./MainBoard.module.css";

export default function MainBoard() {
  const { user, darkTheme } = useAppData();
  const section1TextRef = useRef(null);
  const section2TextRef = useRef(null);
  const tripleOvalRef = useRef(null);
  const underlineRef = useRef(null);
  // asignar nombre de usuario por el texto a la izquierda del correo antes de cualquiera de los signos de la validación
  const username = user?.email.split(/[@+.-_]/)[0];
  let streamHour = new Date().getHours();
  let streamMinute = new Date().getMinutes().toString().padStart(2, 0);

  // asegurar que tripleOval mantenga la proprción con el texto correspondiente sin importar el tamaño de la pantalla
  const resizeHandler = useCallback(() => {
    const textSize = parseFloat(
      window.getComputedStyle(section1TextRef.current).fontSize
    );
    tripleOvalRef.current.style.width = `${textSize * 4.6}px`;
    tripleOvalRef.current.style.height = `${textSize * 5}px`;
  }, []);

  useEffect(() => {
    resizeHandler();
    // Agregar el controlador de eventos de redimensionamiento a la ventana
    window.addEventListener("resize", resizeHandler);
    // Eliminar el controlador de eventos de redimensionamiento cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

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
    <div
      className={`${styles.container} ${
        darkTheme ? styles.containerDark : styles.containerLight
      }`}
    >
      {/* Primera columna */}
      <div className={`${styles.columns} ${styles.column1}`}>
        <section className={styles.section1}>
          <TripleOval
            color={
              darkTheme ? "rgba(126, 51, 240, 0.5)" : "rgba(253, 136, 67,0.5)"
            }
            className={styles.tripleOval}
            ref={tripleOvalRef}
          />
          <p
            ref={section1TextRef}
            className={
              darkTheme
                ? styles.highlightedTextDark
                : styles.column1DescriptionLight
            }
          >
            start
            <br />
            <span
              className={
                darkTheme ? styles.column1HTDark : styles.column1HTLight
              }
            >
              streaming
            </span>
            <br />
            games
            <br />
            diferently
          </p>
        </section>
        <section className={styles.section2}>
          <p
            className={
              darkTheme
                ? styles.column1DescriptionDark
                : styles.column1DescriptionLight
            }
          >
            gamor now has a
          </p>
          <p
            ref={section2TextRef}
            className={`${styles.highlightedText} ${
              darkTheme
                ? styles.highlightedTextDark
                : styles.highlightedTextLight
            }`}
          >
            stream party
            <Underline
              className={
                darkTheme ? styles.column1HTLight : styles.column1HTDark
              }
              ref={underlineRef}
            />
          </p>
          <p
            className={
              darkTheme
                ? styles.column1DescriptionDark
                : styles.column1DescriptionLight
            }
          >
            platform
          </p>
        </section>
        <section className={styles.section3}>
          {!user ? (
            <div className={styles.loginButtonsContainer}>
              <SignupButton />
              <SigninButton />
            </div>
          ) : (
            <p
              className={
                darkTheme
                  ? styles.column1DescriptionDark
                  : styles.column1DescriptionLight
              }
            >
              Thank you for join us {username}!
            </p>
          )}
        </section>
      </div>
      {/* Segunda columna */}
      <div
        className={`${styles.columns} ${styles.column2} ${
          darkTheme ? styles.columnDark : styles.columnLight
        }`}
      >
        {/* *** Cambiar el nombre estático por la variable real */}
        <h2>Fortnite New Season</h2>
        <h6
          className={
            darkTheme
              ? styles.column2DescriptionDark
              : styles.column2DescriptionLight
          }
        >
          Join Live Stream
        </h6>
        <section className={styles.section4}>
          {/* *** hora real del stream */}
          <button
            id="joinStreamBtn"
            className={styles.joinStreamBtn}
            onClick={() => alert("Falta por implementar")}
          >
            <AddUser className={styles.addUserIcon} />
          </button>
          <p
            className={darkTheme ? styles.clockTextDark : styles.clockTextLight}
          >
            {streamHour} : {streamMinute}
          </p>
        </section>
        <section className={styles.section5}>
          <div
            className={`${styles.imgContainer} ${styles.smallImgContainer1} ${
              darkTheme ? styles.imgContainerDark : styles.imgContainerLight
            }`}
          >
            <img src={img1} alt="" className={styles.smallImg} />
          </div>
          <div
            className={`${styles.imgContainer} ${styles.smallImgContainer2}  ${
              darkTheme ? styles.imgContainerDark : styles.imgContainerLight
            }`}
          >
            <div className={styles.reactionBox}>
              <Heart className={styles.reaction} />
            </div>
            <img src={img2} alt="" className={styles.smallImg} />
          </div>
        </section>
        {/* *** cargar imagen correspondiente desde el servidor */}
        <Vector1
          className={styles.vector1}
          color={darkTheme ? "#DC5E14" : "rgba(68, 14, 112, 0.664)"}
        />
        <img src={img3} alt="" className={styles.img3} />
      </div>
      {/* Tercera columna */}
      <div className={`${styles.columns} ${styles.column3}`}></div>
    </div>
  );
}
