import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ActiveHighlight from "../ActiveHighlight/ActiveHighlight";
import validateRoute from "../../config/validateRoute";
import { useAppData } from "../../context/appContext";
import { supabase } from "./../../config/supabase";
import { SigninButton, SignupButton } from "../LoginButtons/LoginButtons";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { user } = useAppData();
  const location = useLocation().pathname; // hook de react router usado para obtener la ruta actual en la navegación
  const [activeRoute, setActiveRoute] = useState(location);
  const routes = [
    { path: "/", name: "Home" },
    { path: "/streams", name: "Streams" },
    { path: "/party", name: "Party" },
    { path: "/premium", name: "Premium" },
  ];

  // definir la vista activa al cambiar la ruta y guardar la ruta actual en el almacenamiento local, se ignoran las rutas de la autenticación y las rutas no válidas
  useEffect(() => {
    if (!validateRoute(location)) {
      return;
    }
    setActiveRoute(location);
    localStorage.setItem("activeRoute", location);
  }, [location]);

  // cargar la última ruta guardada montar el componente
  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    if (savedRoute) {
      setActiveRoute(savedRoute);
    }
  }, []);

  // cerrar sesión
  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      // el retraso es para darle tiempo a la UI a que se actualice al cerrar sesión antes de mostrar la alerta
      setTimeout(() => alert("Your session has been closed!"), 100);
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className={activeRoute === route.path ? styles.activeRoute : ""}
            >
              {activeRoute === route.path ? (
                <ActiveHighlight label={route.name} color="#4B45A1" />
              ) : (
                route.name
              )}
            </Link>
          </li>
        ))}
      </ul>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.blurCircle} />
        <h1>Gamor</h1>
      </div>
      {/* Opciones de autenticación.si no hay sesión iniciada, caso contrario se muestra el botón 'signout' */}
      {!user ? (
        <div className={styles.loginButtonsContainer}>
          <SigninButton />
          <SignupButton classN={styles.signUp} />
        </div>
      ) : (
        <button id="signout" className={styles.signout} onClick={signout}>
          Sign out
        </button>
      )}
    </nav>
  );
}
