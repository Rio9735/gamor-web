import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";
import { useAppData } from "../../context/appContext";
import styles from "./AuthUI.module.css";

export default function AuthUI({ type, title, feedback }) {
  // type='signin' || 'signup' (*Parámetro Requerido* Si se asigna otro valor a type habrá errores)
  // title => String
  // feedback => String (Mensaje auxiliar que se muestra si no ocurre algún error al confirmar el formulario de autenticación)

  const { theme } = useAppData();
  const navigate = useNavigate();
  const [prevRoute, setPrevRoute] = useState(null);
  const [helperText, setHelperText] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Definir mensaje que aparece debajo del formulario
  const message =
    type === "signup" ? "Already have an account?" : "Don't have an account?";
  const linkTo = type === "signup" ? "/signin" : "/signup";
  const linkText = type === "signup" ? "Sign in" : "Create account";

  // Cargar la última ruta guardada montar el componente
  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    if (savedRoute) {
      setPrevRoute(savedRoute);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // Elegir el método de auth para iniciar sesión o crear usuario según el valor de type
    const operation = type === "signup" ? "signUp" : "signInWithPassword";
    const { error } = await supabase.auth[operation]({
      email: email,
      password: password,
      options: {
        redirectTo: prevRoute,
      },
    });
    if (error) {
      setHelperText(error.message);
    } else if (feedback) {
      setHelperText(feedback);
    }
  }

  // Mostrar el mensaje de error durante 5 segundos
  useEffect(() => {
    if (helperText !== feedback) {
      const timer = setTimeout(() => {
        setHelperText(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [helperText, feedback]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.formContainer} ${styles[`formContainer${theme}`]}`}
      >
        <button
          id={`cancel_${type}`}
          className={`${styles.cancelBtn} ${styles[`text${theme}`]}`}
          onClick={() => navigate(prevRoute)}
        >
          X
        </button>
        {title && (
          <h2 className={`${styles.title}  ${styles[`text${theme}`]}`}>
            {title}
          </h2>
        )}
        <form onSubmit={handleSubmit} className={styles[`text${theme}`]}>
          <input
            id={`email_${type}`}
            className={styles.input}
            type="email"
            placeholder="email *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id={`pw_${type}`}
            className={styles.input}
            type="password"
            placeholder="password *"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {type === "signin" && helperText && (
            <label
              htmlFor="pw_signin"
              className={`${styles.loginError} ${styles[`errorText${theme}`]}`}
            >
              {helperText}
            </label>
          )}
          <button id={`accept_${type}`} className={styles.acceptBtn}>
            Accept
          </button>
        </form>
        {type === "signup" && helperText && (
          <p className={`${styles.helperText} ${styles[`text${theme}`]}`}>
            {helperText}
          </p>
        )}
      </div>
      <p className={`${styles.auxText} ${styles[`text${theme}`]}`}>
        {message} <Link to={linkTo}>{linkText}</Link>
      </p>
    </div>
  );
}
