import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import styles from "./LoginButtons.module.css";

export function SigninButton({ classN }) {
  const navigate = useNavigate();
  const { darkTheme } = useAppData();
  return (
    <button
    id='signin'
      className={`${styles.signin} ${darkTheme ? styles.textDark : styles.textLight} ${classN}`}
      onClick={() => navigate("/signin")}
    >
      Sign in
    </button>
  );
}

export function SignupButton({ classN }) {
  const { darkTheme } = useAppData();
  const navigate = useNavigate();
  return (
    <button
    id='signup'
      className={`${styles.signup} ${darkTheme ? styles.textDark : styles.textLight} ${darkTheme ? styles.signupDark : styles.signupLight} ${classN}`}
      onClick={() => navigate("/signup")}
    >
      Create account
    </button>
  );
}
