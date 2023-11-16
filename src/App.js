import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { supabase } from "./config/supabase";
import validateRoute from "./config/validateRoute";
import smoothScroll from "./config/smoothScroll";
import RoutesConfig from "./config/routes";
import NavBar from "./components/NavBar/NavBar";
import GamorLogo from "./components/Logo/GamorLogo";
import styles from "./App.module.css";
import { useAppData } from "./context/appContext";

function MainContent() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); //manejar la carga
  const [dataLoaded, setDataLoaded] = useState(false); // rastrear si ya se cargaron los datos
  const { darkTheme } = useAppData();

  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? "#20262D" : "#EFF2F2";
  }, [darkTheme]);

  const handleScroll = (e) => {
    var target = e.deltaY < 0 ? 0 : document.body.scrollHeight;
    smoothScroll(target, 2000);
  };

  // Asegurar que no se pueda acceder a 'signin' o 'signup' si hay sesión iniciada. Se redireccionará al usuario a 'home'
  useEffect(() => {
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
    <div className={styles.mainContent} onWheel={handleScroll}>
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
