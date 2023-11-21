import { useEffect, useState } from "react";
import avatar1 from "../../assets/avatars/avatar1.svg";
import avatar2 from "../../assets/avatars/avatar2.svg";
import avatar3 from "../../assets/avatars/avatar3.svg";
import avatar4 from "../../assets/avatars/avatar4.svg";
import avatar5 from "../../assets/avatars/avatar5.svg";
import avatar6 from "../../assets/avatars/avatar6.svg";
import avatar7 from "../../assets/avatars/avatar7.svg";
import avatar8 from "../../assets/avatars/avatar8.svg";
import avatar9 from "../../assets/avatars/avatar9.svg";
import avatar10 from "../../assets/avatars/avatar10.svg";
import styles from "./Avatar.module.css";

export default function Avatar({ addViewer = false, totalViewers }) {
  // totalViewers: type = Number => Cantidad de espectadores en el stream
  // addViewer : type= Boolean => Representa la acción de añadir o quitar espectador
  const [viewersAvatar, setViewersAvatar] = useState([]);
  // Elegir avatar de forma aleatoria y Generar el valor de referencia al color del background del avatar de forma aleatoria entre 21-40
  useEffect(() => {
    const avatar = [
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      avatar5,
      avatar6,
      avatar7,
      avatar8,
      avatar9,
      avatar10,
    ];
    const avatarsSelection = [...viewersAvatar];

    // Si viewersAvatar está vacío, inicializa los avatares
    if (viewersAvatar.length === 0) {
      for (var i = 0; i < totalViewers; i++) {
        const chooseAvatar = Math.floor(Math.random() * 10);
        const bg = Math.floor(Math.random() * 20) + 21;
        avatarsSelection.push({ avatar: avatar[chooseAvatar], bg });
      }
    } else {
      // Si no está vacío, agrega o elimina avatares según addViewer
      if (addViewer) {
        const chooseAvatar = Math.floor(Math.random() * 10);
        const bg = Math.floor(Math.random() * 20) + 21;
        avatarsSelection.push({ avatar: avatar[chooseAvatar], bg });
      } else {
        avatarsSelection.pop();
      }
    }

    setViewersAvatar(avatarsSelection);
  }, [addViewer, totalViewers]);

  return (
    <div className={styles.mainContainer}>
      {viewersAvatar.map((item, index) => (
        <div
          key={index}
          className={styles.imgContainer}
          style={{
            backgroundColor: `var(--color${item.bg})`,
            marginLeft: index !== 0 && "-0.5vw",
          }}
        >
          <img alt={item.avatar} src={item.avatar} className={styles.avatar} />
        </div>
      ))}
    </div>
  );
}
