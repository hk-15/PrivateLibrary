import { useContext } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import LogOutButton from "../../components/Buttons/LogOutButton/LogOutButton";
import "./Login.scss";

export default function Login() {
  const loginContext = useContext(LoginContext);

  if (loginContext.isLoggedIn) {
    return (
      <Page>
        <h1 className="border-spaced-bottom">Log out?</h1>
        <LogOutButton />
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="border-spaced-bottom">Log in</h1>
      <div className="border-spaced-bottom">
        <LoginForm />
      </div>
      <h2 className="border-spaced-bottom">Create an acccount</h2>
      <div className="border-spaced-bottom">
        <SignUpForm />
      </div>
    </Page>
  );
}
