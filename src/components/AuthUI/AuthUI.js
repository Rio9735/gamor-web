import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthUI.module.css";
import { supabase } from "../../config/supabase";

export default function AuthUI({ type, title, feedback }) {
  // type='signin' || 'signup' (*Parámetro Requerido* Si se asigna otro valor a type habrá errores)
  // title => String
  // feedback => String (Mensaje auxiliar que se muestra si no ocurre algún error al confirmar el formulario de autenticación)

  const navigate = useNavigate();
  const [prevRoute, setPrevRoute] = useState(null);
  const [helperText, setHelperText] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // para el mensaje que aparece debajo del formulario
  const message =
    type === "signup" ? "Already have an account?" : "Don't have an account?";
  const linkTo = type === "signup" ? "/signin" : "/signup";
  const linkText = type === "signup" ? "Sign in" : "Create account";

  // cargar la última ruta guardada montar el componente
  useEffect(() => {
    const savedRoute = localStorage.getItem("activeRoute");
    if (savedRoute) {
      setPrevRoute(savedRoute);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // elegir el método de auth para iniciar sesión o crear usuario según el valor de type
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

  // muestra el mensaje de error durante 5 segundos
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
      <div className={styles.formContainer}>
        <button
          id={`cancel_${type}`}
          className={styles.cancelBtn}
          onClick={() => navigate(prevRoute)}
        >
          X
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id={`pw_${type}`}
            placeholder="password *"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {type === "signin" && helperText && (
            <label htmlFor="pw_signin" className={styles.loginError}>
              {helperText}
            </label>
          )}
          <button id={`accept_${type}`} className={styles.acceptBtn}>
            Accept
          </button>
        </form>
        {type === "signup" && helperText && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
      <p className={styles.auxText}>
        {message} <Link to={linkTo}>{linkText}</Link>
      </p>
    </div>
  );
}
