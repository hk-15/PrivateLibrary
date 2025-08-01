import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import type { FormStatus } from "../AddBookForm/AddBookForm";
import { logIn } from "../../api/ApiClient";
import { Navigate } from "react-router-dom";

export const LoginForm: React.FC = (): JSX.Element => {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [error, setError] = useState<string>("");

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
            .then(() => {
                setStatus("FINISHED");
            })
            .catch((err) => {
                setStatus("ERROR")
                setError("Login failed. " + err.message);
            })
    };

    if (status === "FINISHED") {
        return (
            <Navigate to="/"></Navigate>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <label htmlFor="email">
                    Email
                    <input type="email" id="email" {...register("email", {required: true})} />
                </label>

                <label htmlFor="password">
                    Password
                    <input id="password" type="password" {...register("password", {required: true})} />
                </label>

                <button 
                    disabled={status === "SUBMITTING"}
                    type="submit">
                    Log In
                </button>
                {status === "ERROR" && <p>{error}.</p>}
            </form>
        </div>
    )
};