import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RoutesConfig from "./config/routes";
import NavBar from "./components/NavBar/NavBar";
import validateRoute from "./config/validateRoute";
import { useEffect, useRef, useState } from "react";
import { supabase } from "./config/supabase";
import "./App.css";

function MainContent() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const mainContentRef = useRef();
  const [show, setShow] = useState(false);
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const measureOverflow = () => {
      const element = mainContentRef.current;
      const elementHeight = element.clientHeight;
      const contentHeight = element.scrollHeight;

      if (contentHeight > elementHeight) {
        setOverflow(contentHeight - elementHeight);
      } else {
        setOverflow(0);
      }
    };

    // Espera un poco antes de medir el desbordamiento
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

  // asegurar que no se pueda acceder a 'signin' o 'signup' si hay sesión iniciada. Se redireccionará al usuario a 'home'
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (location === "/signin" || location === "/signup")) {
        navigate("/");
      }
    });
  }, [navigate, location]);
  return (
    <div
      id="main-content"
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
