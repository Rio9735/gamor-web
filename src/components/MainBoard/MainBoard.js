import { useEffect, useRef, useState } from "react";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import { SigninButton, SignupButton } from "./../LoginButtons/LoginButtons";
import SwitchButton from "../SwitchButton/SwitchButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Avatar from "../Avatar/Avatar";
import PlayerImage from "../PlayerImage/PlayerImage";
import { ReactComponent as TripleOval } from "../../assets/svg/tripleOval.svg";
import { ReactComponent as Underline } from "../../assets/svg/underline.svg";
import { ReactComponent as AddUser } from "../../assets/svg/addUser.svg";
import { ReactComponent as Vector1 } from "../../assets/svg/vector1.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import fortniteImg1 from "../../assets/fortnite/fortnite5.webp";
import fortniteImg2 from "../../assets/fortnite/fortnite6.webp";
import styles from "./MainBoard.module.css";

export default function MainBoard() {
  const { user, theme } = useAppData();
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const inputContainerRef = useRef();
  const [stream, setStream] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [switchValue, setSwitchValue] = useState(0);
  const [userAddedStreaming, setUserAddedStreaming] = useState([]);
  const [gamesInputValue, setGamesInputValue] = useState("All");
  const [gamesInputValueAux, setGamesInputValueAux] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [isGamesInputFocused, setIsGamesInputFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [addIndex, setAddIndex] = useState(null);

  // Asignar nombre de usuario por el texto a la izquierda del correo antes de cualquiera de los signos de la validación
  const username = user?.email.split(/[@+.-_]/)[0];
  const fortniteImg = theme === "Light" ? fortniteImg1 : fortniteImg2;
  let streamHour = new Date().getHours();
  let streamMinute = new Date().getMinutes().toString().padStart(2, 0);

  // ejecutar al cargar la app el filtrado de los juegos para 'All'
  useEffect(() => {
    handleSearchStreams();
  }, [stream]);

  useEffect(() => {
    // Obtener los datos de la bd
    fetchStreams();

    // Configurar un intervalo para volver a cargar los datos cada 5 segundos si hay un error
    const interval = setInterval(() => {
      if (fetchError) {
        fetchStreams();
      }
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [fetchError]);

  // Evitar que haga el scroll animado global cuando se haga scroll en la sección correspondiente con la rueda del mouse
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  // Ejecutar función para filtrar los juegos cuando se enfoque el input o cuando cuando se abra el menú del filtro
  useEffect(() => {
    let gamesInputValueAux = gamesInputValue.toLocaleLowerCase();
    const filteredGamesNames = stream.filter((item) =>
      item.game.game_name
        .toLowerCase()
        .includes(gamesInputValueAux.toLocaleLowerCase())
    );
    setFilteredGames(filteredGamesNames);
  }, [gamesInputValue]);

  // Obtener la altura del input de búsqueda
  useEffect(() => {
    setInputHeight(inputContainerRef.current.offsetHeight);
  }, [inputHeight]);

  // Ejecutar función para obtener los stream correspondientes al filtro cuando se presione el botón de buscar
  const handleSearchStreams = () => {
    let gamesInputValueAux = gamesInputValue.toLocaleLowerCase();

    // Filtrar por platform_id
    let filteredByPlatform = stream.filter((item) => {
      let platformId = item.platform_id;
      return platformId === switchValue + 1;
    });

    // filtrar por juego
    if (gamesInputValueAux === "all") {
      setFilteredStreams(filteredByPlatform);
    } else {
      const newFilteredStreams = filteredByPlatform.filter((item) =>
        item.game.game_name.toLowerCase().includes(gamesInputValueAux)
      );
      setFilteredStreams(newFilteredStreams);
    }
  };

  // Función para mostrar los resultados del filtrado
  async function fetchStreams() {
    try {
      let { data, error } = await supabase
        .from("stream")
        .select(
          `stream_id, game:game_id (game_name), platform_id, user_id, user:user_id (stream_id, username), viewer_count`
        );
      if (error) throw error;
      setFetchError(false);
      setStream(data);
    } catch (error) {
      setFetchError(true);
    }
  }

  // Manejar la adición o eliminación del usuario en el stream
  const handleUserAddedStreaming = async (streamId, userId, index) => {
    setAddIndex(index);
    // Revisar si ya el usuario está agregado a algún stream
    const { data } = await supabase
      .from("user")
      .select("*")
      .match({ stream_id: streamId, user_id: userId });
    setUserAddedStreaming(data);

    // Actualizar el estado de subscripción del stream en la bd
    supabase
      .from("user")
      .update({ stream_id: data?.length > 0 ? null : streamId })
      .match({ user_id: userId })
      .then(({ _data, error }) => {
        if (error) console.error("Error updating viewers_count:", error);
      });
  };

  // Manejar el botón de cada sugerencia del input de búsqueda
  const handleSearchSuggestion = (item) => {
    setGamesInputValue(item);
    setGamesInputValueAux(item); // para establecer el valor auxiliar antes de que se desenfoque el input
  };

  // Guardar el valor anterior del input al enfocarlo para regresarlo al desenfocarlo al presionar fuera de las sugerencias(limpiar el input sin perder el valor anterior)
  const handleOnFocusGamesInput = () => {
    setGamesInputValueAux(gamesInputValue);
    setGamesInputValue("");
    setIsGamesInputFocused(!isGamesInputFocused);
  };

  const handleOnBlurGamesInput = () => {
    setFilteredGames([]);
    setGamesInputValue(gamesInputValueAux);
    setIsGamesInputFocused(!isGamesInputFocused);
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
            game
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
        <h2>Fortnite New Season</h2>
        <h6 className={styles[`column2Description${theme}`]}>
          Join Live Stream
        </h6>
        <section className={styles.section4}>
          <button
            id="joinStreamBtn"
            className={styles.joinStreamBtn}
            onClick={() => {
              !user && navigate("/signin");
            }}
          >
            <AddUser className={styles.userAddedStreamingIcon} />
          </button>
          <p className={styles[`clockText${theme}`]}>
            {streamHour} : {streamMinute}
          </p>
        </section>
        <PlayerImage cantPlayers={4} />
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
          <SwitchButton
            value={switchValue}
            onChange={(index) => setSwitchValue(index)}
          />
        </section>
        {/* Sección del filtro */}
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
            {/* Sugerencias del input para el filtro */}
            {isGamesInputFocused && (
              <div
                className={`${styles.inputSuggestions} ${styles.scrollBar} ${
                  styles[`filterContainer${theme}`]
                }`}
                style={{ top: inputHeight }}
                onWheel={handleWheel}
              >
                <button
                  className={styles.suggestedOptionButton}
                  onMouseDown={() => handleSearchSuggestion("All")}
                >
                  All
                </button>
                {filteredGames.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={styles.suggestedOptionButton}
                      onMouseDown={() =>
                        handleSearchSuggestion(item.game.game_name)
                      }
                    >
                      {item.game.game_name}
                    </button>
                  );
                })}
              </div>
            )}
            <div
              className={`${styles.filterOptions} ${
                styles[`filterBorderBottom${theme}`]
              }`}
              ref={inputContainerRef}
            >
              {user ? (
                <input
                  id="searchInput"
                  className={styles.filterSearchInput}
                  ref={searchInputRef}
                  type="text"
                  placeholder="Escriba el nombre del juego"
                  autoCorrect="false"
                  maxLength={50}
                  value={gamesInputValue}
                  onChange={(e) => setGamesInputValue(e.target.value)}
                  onFocus={handleOnFocusGamesInput}
                  onBlur={handleOnBlurGamesInput}
                />
              ) : (
                <p>Inicie sesión para habilitar todas las funciones </p>
              )}

              <Filter
                className={styles.filterIcon}
                onClick={() => {
                  user ? searchInputRef.current.focus() : navigate("/signin");
                }}
              />
            </div>
            <div
              className={`${styles.filterResultsBody} ${styles.scrollBar}`}
              onWheel={handleWheel}
            >
              {/* Mostrar resultados del filtro */}
              {!user ? null : !fetchError ? (
                filteredStreams.map((item, index) => {
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
                      <p className={styles.resultsText}>{item.user.username}</p>
                      <div className={styles.resultsAvatarsContainer}>
                        <Avatar
                          id={index}
                          totalViewers={item.viewer_count}
                          addViewer={
                            addIndex === index &&
                            userAddedStreaming.length === 0 &&
                            true
                          }
                        />
                      </div>
                      <button
                        className={`${styles.column3AddButton} ${
                          styles[`column3AddButton${theme}`]
                        }`}
                        onClick={() =>
                          handleUserAddedStreaming(
                            item.stream_id,
                            user.id,
                            index
                          )
                        }
                      >
                        {addIndex === index && userAddedStreaming.length === 0
                          ? "-"
                          : "+"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className={styles.errorMessageContainer}>
                  <p className={styles.errorMessageText}>
                    An error occurred. Check your internet connection or try
                    again!
                  </p>
                  <LoadingSpinner size={2} border={0.5} />
                </div>
              )}
            </div>
            {user && (
              <button
                className={`${styles.searchButton} ${
                  styles[`searchButton${theme}`]
                }`}
                onClick={handleSearchStreams}
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
