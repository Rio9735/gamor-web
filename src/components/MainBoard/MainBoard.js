import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import { SigninButton, SignupButton } from "./../LoginButtons/LoginButtons";
import SwitchButton from "../SwitchButton/SwitchButton";
import PlayerImage from "../PlayerImage/PlayerImage";
import { ReactComponent as TripleOval } from "../../assets/svg/tripleOval.svg";
import { ReactComponent as Underline } from "../../assets/svg/underline.svg";
import { ReactComponent as AddUser } from "../../assets/svg/addUser.svg";
import { ReactComponent as Vector1 } from "../../assets/svg/vector1.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import fortniteImg1 from "../../assets/fortnite/fortnite5.png";
import fortniteImg2 from "../../assets/fortnite/fortnite6.png";
import styles from "./MainBoard.module.css";
import Avatar from "../Avatar/Avatar";

export default function MainBoard() {
  const { user, theme } = useAppData();
  const navigate = useNavigate();
  /*
   *  valores de userAddedStreaming => {user, game, streamer}
   *  user: correo del usuario.
   *  game: nombre del juego.
   *  streamer: nombre del streamer.
   */
  const [userAddedStreaming, setUserAddedStreaming] = useState([]);
  // Asignar nombre de usuario por el texto a la izquierda del correo antes de cualquiera de los signos de la validación
  const username = user?.email.split(/[@+.-_]/)[0];
  const fortniteImg = theme === "Light" ? fortniteImg1 : fortniteImg2;
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
      username: "FunctionPhantom",
    },
  ];

  // Evitar que haga el scroll animado global cuando se haga scroll en la sección correspondiente con la rueda del mouse
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  // Manejar el agrego o eliminación del usuario del streaming
  const handleUserAddedStreaming = (id, user, game, streamer) => {
    setUserAddedStreaming((prevState) => {
      // Verificar si el usuario ya está en el streaming
      const exists = prevState[id]?.some(
        (item) =>
          item.user === user && item.game === game && item.streamer === streamer
      );

      if (exists) {
        // Si el usuario ya está en el streaming, lo elimina
        const filteredArray = prevState[id].filter(
          (item) =>
            item.user !== user ||
            item.game !== game ||
            item.streamer !== streamer
        );

        if (filteredArray.length === 0) {
          // Si no quedan usuarios en el streaming, elimina el streaming
          const { [id]: _, ...rest } = prevState;
          return rest;
        } else {
          // Si quedan usuarios en el streaming, actualiza la lista de usuarios
          return {
            ...prevState,
            [id]: filteredArray,
          };
        }
      } else {
        // Si el usuario no está en el streaming, lo agrega
        return {
          ...prevState,
          [id]: [...(prevState[id] || []), { user, game, streamer }],
        };
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
            <AddUser className={styles.userAddedStreamingIcon} />
          </button>
          <p className={styles[`clockText${theme}`]}>
            {streamHour} : {streamMinute}
          </p>
        </section>
        <PlayerImage cantPlayers={4} />
        {/* *** cargar imagen correspondiente desde el servidor */}
        <Vector1 className={`${styles.vector1} ${styles[`vector1${theme}`]}`} />
        <img src={fortniteImg} alt="" className={styles.fortniteImg} />
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
                      <div className={styles.resultsAvatars}>
                        <Avatar
                          id={index}
                          // !!userAddedStreaming[index] será true si userAddedStreaming[index] es un valor truthy, y false si userAddedStreaming[index] es un valor falsy
                          addViewer={!!userAddedStreaming[index]}
                        />
                      </div>
                      <button
                        className={`${styles.column3AddButton} ${
                          styles[`column3AddButton${theme}`]
                        }`}
                        onClick={() =>
                          handleUserAddedStreaming(
                            index,
                            user?.email,
                            item.game,
                            item.username
                          )
                        }
                      >
                        {userAddedStreaming[index] ? "-" : "+"}
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
