import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import { supabase } from "./../../config/supabase";
import validateRoute from "../../config/validateRoute";
import GamorLogo from "../Logo/GamorLogo";
import { SigninButton, SignupButton } from "../LoginButtons/LoginButtons";
import { ReactComponent as Oval } from "../../assets/svg/oval.svg";
import { ReactComponent as Moon } from "../../assets/svg/moon-outline.svg";
import { ReactComponent as Sun } from "../../assets/svg/sunny-outline.svg";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { user, theme, toggleTheme } = useAppData();
  const location = useLocation().pathname;
  const [activeRoute, setActiveRoute] = useState(location);
  const routes = [
    { path: "/", name: "Home" },
    { path: "/streams", name: "Streams" },
    { path: "/party", name: "Party" },
    { path: "/premium", name: "Premium" },
  ];

  // Asignar el nombre de clase CSS apropiado basado en la ruta activa y el tema
  const activeRouteClassName = (route) => {
    if (activeRoute === route.path) {
      return theme === "Dark"
        ? styles.activeRouteDark
        : styles.activeRouteLight;
    } else {
      return theme === "Dark" ? styles.textDark : styles.textLight;
    }
  };

  // Definir la vista activa al cambiar la ruta y guardar la ruta actual en el almacenamiento local, se ignoran las rutas de la autenticación y las rutas no válidas
  useEffect(() => {
    if (!validateRoute(location)) {
      return;
    }
    setActiveRoute(location);
    localStorage.setItem("activeRoute", location);
  }, [location]);

  // Cargar la última ruta guardada montar el componente
  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    if (savedRoute) {
      setActiveRoute(savedRoute);
    }
  }, []);

  // Cerrar sesión
  const signout = async () => {
    // Eliminar la categoría del almacenamiento local
    localStorage.removeItem("selectedCategory");

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      // El retraso es para darle tiempo a la UI a que se actualice al cerrar sesión antes de mostrar la alerta
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
              className={`${
                activeRoute === route.path ? styles.activeRoute : ""
              } ${activeRouteClassName(route)} `}
            >
              {activeRoute === route.path ? (
                <div className={styles.navOptionContainer}>
                  <Oval
                    className={`${styles.oval} ${styles[`oval${theme}`]}`}
                   
                  />
                  <span>{route.name}</span>
                </div>
              ) : (
                route.name
              )}
            </Link>
          </li>
        ))}
      </ul>
      {/* Logo */}
      <GamorLogo />
      <div className={styles.rightSection}>
        {/* botón de cambio de tema */}
        <button
          id="toggleTheme"
          className={`${styles.toggleTheme} ${styles[`toggle${theme}`]}`}
          onClick={toggleTheme}
        >
          {theme === "Dark" ? (
            <Sun className={styles.lightIcon} />
          ) : (
            <Moon className={styles.darkIcon} />
          )}
        </button>
        {/* Opciones de autenticación.si no hay sesión iniciada, caso contrario se muestra el botón 'signout' */}
        {!user ? (
          <>
            <SigninButton />
            <SignupButton classN={styles.signup} />
          </>
        ) : (
          <button
            id="signout"
            className={`${styles.signout} ${styles[`text${theme}`]}`}
            onClick={signout}
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
