import React, { useEffect } from "react";
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
import { useAppData } from "./context/appContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import styles from "./App.module.css";

function MainContent() {
  const { loading, error, theme } = useAppData();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "Dark" ? "var(--color4)" : "var(--color2)";
  }, [theme]);

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
    });
  }, [navigate, location]);

  // Mostrar feedback de carga mientras se cargan los datos de la app para evitar parpadeos en la renderización de los componentes
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <GamorLogo classN={styles.loadingText} />
        <LoadingSpinner />
      </div>
    );
    // Mostrar mensaje de error si no se cargan los datos
  } else if (error) {
    return (
      <div className={styles.loadingContainer}>
        <p className={`${styles.errorText} ${styles[`errorText${theme}`]}`}>
          An error occurred. Please check your internet connection or refresh
          the page!
        </p>
        <LoadingSpinner />
      </div>
    );
    // SI todo se carga correctamente se renderiza la app
  } else {
    return (
      <div className={styles.mainContent} onWheel={handleScroll}>
        {validateRoute(location) && <NavBar />}
        <RoutesConfig />
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
