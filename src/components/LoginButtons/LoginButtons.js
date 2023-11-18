import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/appContext";
import styles from "./LoginButtons.module.css";

export function SigninButton({ classN }) {
  const navigate = useNavigate();
  const { theme } = useAppData();
  return (
    <button
      id="signin"
      className={`${styles.signin} ${styles[`text${theme}`]} ${classN}`}
      onClick={() => navigate("/signin")}
    >
      Sign in
    </button>
  );
}

export function SignupButton({ classN }) {
  const { theme } = useAppData();
  const navigate = useNavigate();
  return (
    <button
      id="signup"
      className={`${styles.signup} ${styles[`text${theme}`]} ${
        styles[`signup${theme}`]
      } ${classN}`}
      onClick={() => navigate("/signup")}
    >
      Create account
    </button>
  );
}
