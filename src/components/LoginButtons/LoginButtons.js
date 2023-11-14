import { useNavigate } from "react-router-dom";
import styles from "./LoginButtons.module.css";

export function SigninButton({classN}) {
  const navigate = useNavigate();
  return (
    <button className={`${styles.signin} ${classN}`} onClick={() => navigate("/signin")}>
      Sign in
    </button>
  );
}

export function SignupButton({classN}) {
  const navigate = useNavigate();
  return (
    <button className={`${styles.signup} ${classN}`} onClick={() => navigate("/signup")}>
      Create account
    </button>
  );
}
