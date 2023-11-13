import { useRef, useEffect, useState } from "react";
import { ReactComponent as Oval } from "../../assets/oval.svg";
import styles from "./ActiveHighlight.module.css";

export default function ActiveHighlight({ label, color }) {
  const [ovalWidth, setOvalWidth] = useState(0);
  const labelRef = useRef();
  // asigna a ovalWidth el ancho del span al montar el componente
  useEffect(() => {
    if (labelRef.current) {
      setOvalWidth(labelRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* crear el componente svg del highlight de la la vista activa */}
      <Oval
        className={styles.oval}
        style={{ color, minWidth: ovalWidth + 40 }}
      />
      <span ref={labelRef}>{label}</span>
    </div>
  );
}
