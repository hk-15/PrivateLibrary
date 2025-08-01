import { LoginForm } from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Page } from "../Page/Page";

export default function Login() {
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