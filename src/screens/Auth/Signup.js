import AuthUI from "../../components/AuthUI/AuthUI";

export default function Signup() {
  return (
    <AuthUI
      type="signup"
      title="Create account"
      feedback="Please verify your email to complete the sign up"
    />
  );
}
