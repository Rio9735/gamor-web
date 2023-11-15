import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { supabase } from "./config/supabase";
import validateRoute from "./config/validateRoute";
import RoutesConfig from "./config/routes";
import NavBar from "./components/NavBar/NavBar";
import GamorLogo from "./components/Logo/GamorLogo";
import styles from "./App.module.css";

function MainContent() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const mainContentRef = useRef();
  const [show, setShow] = useState(false);
  const [overflow, setOverflow] = useState(0);
  const [loading, setLoading] = useState(true); //manejar la carga
  const [dataLoaded, setDataLoaded] = useState(false); // rastrear si ya se cargaron los datos

  useEffect(() => {
    const measureOverflow = () => {
      const element = mainContentRef.current;
      if (element) {
        const elementHeight = element.clientHeight;
        const contentHeight = element.scrollHeight;

        if (contentHeight > elementHeight) {
          setOverflow(contentHeight - elementHeight);
        } else {
          setOverflow(0);
        }
      }
    };

    // Espera 1 segundo antes de medir el desbordamiento para asegurar que se maneje el dato correcto
    const timeoutId = setTimeout(measureOverflow, 1000);

    // Limpia el temporizador si el componente se desmonta antes de que se ejecute el temporizador
    return () => clearTimeout(timeoutId);
  }, [location]);

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

  // Asegurar que no se pueda acceder a 'signin' o 'signup' si hay sesión iniciada. Se redireccionará al usuario a 'home'
  useEffect(() => {
    // Restablecer el desbordamiento al cambiar de ruta o recargar la página
    setOverflow(0);
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (location === "/signin" || location === "/signup")) {
        navigate("/");
      }
      // Actualizar el estado de rastreo cuando los datos se han cargado
      setDataLoaded(true);
    });
  }, [navigate, location]);

  // Mostrar feedback de carga mientras se cargan los datos, si los datos no se cargan en 5 segundos se ocultará el indicador de carga y se renderizará la aplicación
  useEffect(() => {
    let timer;
    if (!dataLoaded) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
    } else {
      setLoading(false);
    }

    return () => clearTimeout(timer);
  }, [dataLoaded]);

  // mostrar feedback de carga mientras se cargan los datos de la app para evitar parpadeos en la renderización de los componentes
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <GamorLogo classN={styles.loadingText} />
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  return (
    <div
      className={styles.mainContent}
      ref={mainContentRef}
      style={{
        transform: show ? `translateY(-${overflow}px)` : "none",
      }}
    >
      {validateRoute(location) && <NavBar />}
      <RoutesConfig />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
