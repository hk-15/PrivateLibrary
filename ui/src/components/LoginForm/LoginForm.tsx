import { useContext, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import type { FormStatus } from "../AddBookForm/AddBookForm";
import { logIn } from "../../api/ApiClient";
import { LoginContext } from "../LoginManager/LoginManager";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = (): JSX.Element => {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [error, setError] = useState<string>("");
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        },
    });
    
    function submitForm(data: {
        email: string,
        password: string
    }) {
        setStatus("SUBMITTING");
        logIn(data)
            .then((response) => {
                loginContext.logIn(response.isAdmin, response.userName)
                setStatus("FINISHED")
                navigate("/");
            })
            .catch((err) => {
                setStatus("ERROR")
                setError("Login failed. " + err.message);
            })
    };

    return (
        <form className="account-form" onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="email">
                Email
                <input required type="email" id="email" {...register("email", {required: true})} />
            </label>

            <label htmlFor="password">
                Password
                <input required id="password" type="password" {...register("password", {required: true})} />
            </label>

            <button 
                className="account-button"
                disabled={status === "SUBMITTING"}
                type="submit">
                Log In
            </button>
            {status === "ERROR" && <p>{error}.</p>}
        </form>
    )
};