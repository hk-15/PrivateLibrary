import { useContext } from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import LogOutButton from "../../components/Buttons/LogOutButton/LogOutButton";

export default function Login() {
    const loginContext = useContext(LoginContext);

    if (loginContext.isLoggedIn) {
        return (
            <Page>
                <h1>Log out?</h1>
                <LogOutButton/>
            </Page>
        )
    };
    
    return (
        <Page>
            <h1>Log in</h1>
            <LoginForm/>
            <p>or</p>
            <h2>Create an acccount</h2>
            <SignUpForm/>
        </Page>
    )
}