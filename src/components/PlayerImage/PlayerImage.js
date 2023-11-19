import { useEffect, useState } from "react";
import { useAppData } from "../../context/appContext";
import { ReactComponent as Heart } from "../../assets/svg/heart.svg";
import { ReactComponent as Eye } from "../../assets/svg/eye.svg";
import fortnite1 from "../../assets/fortnite/fortnite1.png";
import fortnite2 from "../../assets/fortnite/fortnite2.png";
import fortnite3 from "../../assets/fortnite/fortnite3.png";
import fortnite4 from "../../assets/fortnite/fortnite4.png";
import fortnite5 from "../../assets/fortnite/fortnite5.png";
import fortnite6 from "../../assets/fortnite/fortnite6.png";
import styles from "./PlayerImage.module.css";

const images = [
  fortnite1,
  fortnite2,
  fortnite3,
  fortnite4,
  fortnite5,
  fortnite6,
];

const ReactionDiv = ({ img, theme, index, total }) => {
  const [reaction, setReaction] = useState("like");
  const [pos, setPos] = useState({ top: null, right: null, left: null });

  useEffect(() => {
    // Generar valores aleatorios para 'top'. Nunca excederá de 20vh
    const top = (index / total) * 25;

    // Generar valores para 'left' y 'right'. Dependiendo de si el índice es par o impar se ubicará la imagen en la zona de la izquierda o en la zona de la derecha. Nunva excederá de 10vw
    const right = index % 2 === 1 ? Math.random() * 5 : null;
    const left = index % 2 === 0 ? Math.random() * 5 : null;
    setPos({ top, right, left });
  }, [index, total]);

  // Cambiar la reacción, usada cuando el usuario hace click en la imagen correspondiente
  const changeReaction = () => {
    if (reaction === "like") {
      setReaction("view");
    } else if (reaction === "view") {
      setReaction("none");
    } else {
      setReaction("like");
    }
  };

  return (
    <div
      className={`${styles.imgContainer} ${styles[`imgContainer${theme}`]}`}
      style={{
        top: `${pos.top}vh`,
        right: `${pos.right}vw`,
        left: `${pos.left}vw`,
      }}
      onClick={changeReaction}
    >
      <img src={img} alt="" className={styles.img} />
      {(reaction === "like" || reaction === "view") && (
        <div className={styles.reactionBox}>
          {reaction === "like" ? (
            <Heart className={styles.reaction} />
          ) : reaction === "view" ? (
            <Eye className={styles.reaction} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default function PlayerImage({ cantPlayers }) {
  const { theme } = useAppData();

  return (
    <div className={styles.mainContainer}>
      {images.slice(0, cantPlayers).map((img, index) => (
        <ReactionDiv
          key={index}
          img={img}
          theme={theme}
          index={index}
          total={cantPlayers}
        />
      ))}
    </div>
  );
}
