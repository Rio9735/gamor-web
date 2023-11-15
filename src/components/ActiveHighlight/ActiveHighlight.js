import { useRef, useEffect, useState } from "react";
import { ReactComponent as Oval } from "../../assets/svg/oval.svg";
import styles from "./ActiveHighlight.module.css";

export default function ActiveHighlight({ label, color }) {
  const [ovalWidth, setOvalWidth] = useState(0);
  const labelRef = useRef();

  // asigna a ovalWidth el ancho del span al montar el componente y cada vez que cambie el texto
  useEffect(() => {
    const updateWidth = () => {
      if (labelRef.current) {
        // Si el ancho de la ventana es menor a 500px, establece un tamaño específico para ovalWidth
        if (window.innerWidth < 500) {
          setOvalWidth(labelRef.current.offsetWidth + 10); // Cambia este valor al tamaño que desees
        } else {
          setOvalWidth(labelRef.current.offsetWidth + 20);
        }
      }
    };

    // Actualizar el ancho al montar el componente
    updateWidth();

    // Actualizar el ancho cuando cambia el texto
    window.addEventListener("resize", updateWidth);

    // Limpiar el controlador de eventos cuando se desmonta el componente
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [label]);

  return (
    <div className={styles.container}>
      {/* crear el componente svg del highlight de la vista activa */}
      <Oval className={styles.oval} style={{ color, minWidth: ovalWidth }} />
      <span ref={labelRef}>{label}</span>
    </div>
  );
}
