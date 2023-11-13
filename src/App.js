import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RoutesConfig from "./config/routes";
import NavBar from "./components/NavBar/NavBar";
import validateRoute from "./config/validateRoute";
import { useEffect } from "react";
import { supabase } from "./config/supabase";
import "./App.css";

function MainContent() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  // asegurar que no se pueda acceder a 'signin' o 'signup' si hay sesión iniciada. Se redireccionará al usuario a 'home'
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (location === "/signin" || location === "/signup")) {
        navigate("/");
      }
    });
  }, [navigate, location]);
  return (
    <>
      {validateRoute(location) && <NavBar />}
      <RoutesConfig />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
