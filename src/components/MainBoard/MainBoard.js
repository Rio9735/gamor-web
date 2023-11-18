import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import { SigninButton, SignupButton } from "./../LoginButtons/LoginButtons";
import SwitchButton from "../SwitchButton/SwitchButton";
import { ReactComponent as TripleOval } from "../../assets/svg/tripleOval.svg";
import { ReactComponent as Underline } from "../../assets/svg/underline.svg";
import { ReactComponent as AddUser } from "../../assets/svg/addUser.svg";
import { ReactComponent as Heart } from "../../assets/svg/heart.svg";
import { ReactComponent as Eye } from "../../assets/svg/eye.svg";
import { ReactComponent as Vector1 } from "../../assets/svg/vector1.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import img1 from "../../assets/fortnite/fortnite7.png";
import img2 from "../../assets/fortnite/fortnite8.png";
import img3 from "../../assets/fortnite/fortnite1.png";
import styles from "./MainBoard.module.css";

export default function MainBoard() {
  const { user, theme } = useAppData();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState([]);
  // asignar nombre de usuario por el texto a la izquierda del correo antes de cualquiera de los signos de la validación
  const username = user?.email.split(/[@+.-_]/)[0];
  let streamHour = new Date().getHours();
  let streamMinute = new Date().getMinutes().toString().padStart(2, 0);

  /* *** eliminar cuando cree los datos en la bd */
  var datos_de_prueba = [
    { game: "COD warzone", username: "PixelWarrior" },
    { game: "COD warzone", username: "GameNinja" },
    { game: "COD warzone", username: "DigitalKnight" },
    { game: "COD warzone", username: "CyberSamurai" },
    { game: "COD warzone", username: "VirtualViking" },
    { game: "COD warzone", username: "BinaryBarbarian" },
    { game: "COD warzone", username: "CodeConqueror" },
    { game: "COD warzone", username: "DataDragon" },
    { game: "COD warzone", username: "ScriptSorcerer" },
    {
      game: "COD warzone",
      username: "FunctionPhantomProMax",
    },
  ];

  // Evitar que haga el scroll animado global cuando se haga scroll en la sección correspondiente con la rueda del mouse
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  const handleAddUser = (user, game, streamer) => {
    setIsAdded((prevState) => {
      // Verificar si el usuario ya estaba agregado
      const exists = prevState.some(
        (item) =>
          item.user === user && item.game === game && item.streamer === streamer
      );

      if (exists) {
        // Si existe, se borra
        return prevState.filter(
          (item) =>
            item.user !== user ||
            item.game !== game ||
            item.streamer !== streamer
        );
      } else {
        // Si no existe, se agrega
        return [...prevState, { user, game, streamer }];
      }
    });
  };

  return (
    <div className={`${styles.container} ${styles[`container${theme}`]}`}>
      {/* Primera columna */}
      <div className={`${styles.columns} ${styles.column1}`}>
        <section className={styles.section1}>
          <TripleOval
            className={`${styles.tripleOval} ${styles[`tripleOval${theme}`]}`}
          />
          <p
            className={`${styles.section1Text} ${
              styles[`highlightedText${theme}`]
            }`}
          >
            start
            <br />
            <span className={styles[`column1HT${theme}`]}>streaming</span>
            <br />
            games
            <br />
            differently
          </p>
        </section>
        <section className={styles.section2}>
          <span className={styles[`text1${theme}`]}>gamor now has a</span>
          <div className={styles.highlightedTextContainer}>
            <span
              className={`${styles.highlightedText} ${
                styles[`highlightedText${theme}`]
              }`}
            >
              stream party
            </span>
            <Underline
              className={`${styles.underlineText} ${
                styles[`underlineText${theme}`]
              }`}
            />
          </div>
          <span className={styles[`text1${theme}`]}>platform</span>
        </section>
        <section className={styles.section3}>
          {!user ? (
            <div className={styles.loginButtonsContainer}>
              <SignupButton />
              <SigninButton />
            </div>
          ) : (
            <p className={styles[`text1${theme}`]}>
              Thank you for join us {username}!
            </p>
          )}
        </section>
      </div>
      {/* Segunda columna */}
      <div
        className={`${styles.columns} ${styles.column2} ${
          styles[`column${theme}`]
        }`}
      >
        {/* *** Cambiar el nombre estático por la variable real */}
        <h2>Fortnite New Season</h2>
        <h6 className={styles[`column2Description${theme}`]}>
          Join Live Stream
        </h6>
        <section className={styles.section4}>
          {/* *** hora real del stream */}
          <button
            id="joinStreamBtn"
            className={styles.joinStreamBtn}
            onClick={() => {
              user ? alert("Falta por implementar") : navigate("/signin");
            }}
          >
            <AddUser className={styles.addUserIcon} />
          </button>
          <p className={styles[`clockText${theme}`]}>
            {streamHour} : {streamMinute}
          </p>
        </section>
        <section className={styles.section5}>
          <div
            className={`${styles.imgContainer} ${styles.smallImgContainer1} ${
              styles[`imgContainer${theme}`]
            }`}
          >
            <img src={img1} alt="" className={styles.smallImg} />
            <div className={styles.reactionBox}>
              <Eye className={styles.reaction} />
            </div>
          </div>
          <div
            className={`${styles.imgContainer} ${styles.smallImgContainer2}  ${
              styles[`imgContainer${theme}`]
            }`}
          >
            <div className={styles.reactionBox}>
              <Heart className={styles.reaction} />
            </div>
            <img src={img2} alt="" className={styles.smallImg} />
          </div>
        </section>
        {/* *** cargar imagen correspondiente desde el servidor */}
        <Vector1 className={`${styles.vector1} ${styles[`vector1${theme}`]}`} />
        <img src={img3} alt="" className={styles.img3} />
      </div>
      {/* Tercera columna */}
      <div className={`${styles.columns} ${styles.column3}`}>
        <section className={styles.column3Sections}>
          <div className={styles.titleContainer}>
            <p className={styles.column3TitleNum}>01.</p>
            <p className={styles[`highlightedText${theme}`]}>Choose Platform</p>
          </div>
          <SwitchButton />
        </section>
        {/* sección del filtro */}
        <section
          className={`${styles.column3Sections} ${styles.column3LastSection} ${
            styles[`column3LastSection${theme}`]
          }`}
        >
          <div className={styles.titleContainer}>
            <p className={styles.column3TitleNum}>02.</p>
            <p className={styles[`highlightedText${theme}`]}>Searching game</p>
          </div>
          <div
            className={`${styles.filterContainer} ${
              styles[`filterContainer${theme}`]
            }`}
          >
            <div
              className={`${styles.filterOptions} ${
                styles[`filterBorderBottom${theme}`]
              }`}
            >
              <p>
                {user
                  ? "COD Warzone"
                  : "Inicie sesión para habilitar todas las funciones"}
              </p>
              <Filter
                className={styles.filterIcon}
                onClick={() => {
                  user ? alert("falta por implementar") : navigate("/signin");
                }}
              />
            </div>
            {/* hacer un map para mostrar cada usuario con el boton de + o - correspondiente*/}
            <div className={styles.filterResultsBody} onWheel={handleWheel}>
              {user &&
                datos_de_prueba.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.filterResults} ${
                        styles[`filterResultsText${theme}`]
                      }`}
                    >
                      <span
                        className={`${styles.resultIndex} ${
                          styles[`resultIndex${theme}`]
                        }`}
                      >
                        {++index}
                      </span>
                      <p className={styles.resultsText}>{item.username}</p>
                      <p className={styles.resultsAvatars}>
                        {isAdded.some(
                          (value) =>
                            value.user === user?.email &&
                            value.game === item.game &&
                            value.streamer === item.username
                        ) && "Avatar"}
                      </p>
                      <button
                        className={styles.column3AddButton}
                        onClick={() =>
                          handleAddUser(user?.email, item.game, item.username)
                        }
                      >
                        {isAdded.some(
                          (value) =>
                            value.user === user?.email &&
                            value.game === item.game &&
                            value.streamer === item.username
                        )
                          ? "-"
                          : "+"}
                      </button>
                    </div>
                  );
                })}
            </div>
            {user && (
              <button
                className={`${styles.searchButton} ${
                  styles[`searchButton${theme}`]
                }`}
              >
                Search Now
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
