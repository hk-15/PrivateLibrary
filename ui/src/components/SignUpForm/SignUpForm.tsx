import { useForm } from "react-hook-form";
import type { FormStatus } from "../AddBookForm/AddBookForm";
import { useEffect, useState } from "react";
import { signUp } from "../../api/ApiClient";

export default function SignUpForm () {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [strength, setStrength] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const strengthColor = { Weak: "red", Medium: "orange", Strong: "green" };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: ""
        }
    });

    const password = watch('password', '');

    function evaluatePasswordStrength(password: string) {
        let score = 0;
        if (!password) return '';
        if (password.length >= 6) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
            case 1:
            case 2:
                return "Weak";
            case 3:
            case 4:
                return "Medium";
            case 5:
                return "Strong";
            default:
                return "";
        }
    };

    useEffect(() => {
        setStrength(evaluatePasswordStrength(password));
    }, [password]);
    

    function submitForm(data: {
        username: string,
        name: string,
        email: string,
        password: string
    }) {
        if (strength != "Strong") {
            setStatus("ERROR");
            setPasswordError("Passwords must be at least 6 characters long and have at least one of each of the following: lowercase and uppercase letters, numbers, special characters")
        }
        signUp(data)
            .then(() => {
                setStatus("FINISHED");
                reset();
            })
            .catch((err) => {
                setStatus("ERROR");
                setError(err.message);
            })
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="username-signup">
                Username<span className="required">*</span>
                <input
                id="username-signup"
                type="text"
                {...register("username", {required: true, pattern: {value: /^\w{4,12}$/, message: "Username must be between 4 and 12 characters long and contain only letters, numbers and underscores."}})}
                />
                {errors.username && <p className="erorr">{errors.username.message}</p>}
            </label>

            <label htmlFor="name-signup">
                Name<span className="required">*</span>
                <input
                id="name-signup"
                type="text"
                {...register("name", {required: true})}
                />
            </label>

            <label htmlFor="email-signup">
                Email<span className="required">*</span>
                <input
                id="email-signup"
                type="email"
                {...register("email", {required: true, pattern: {value: /^[^\s]+@[^\s]+\.[^\s]{3,}$/, message: "Please enter a valid email."}})}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </label>

            <label htmlFor="password-signup">
                Password<span className="required">*</span>
                <input
                id="password-signup"
                type="password"
                {...register("password", {required: true})}
                />
                <small>
                    Password strength:{' '}
                    <span style={{
                        fontWeight: 'bold',
                        color: strengthColor[strength as keyof typeof strengthColor],
                    }}>
                        {strength}
                    </span>
                </small>
                {passwordError && <p className="error">{passwordError}</p>}
            </label>

            <button
                disabled={status === "SUBMITTING"}
                type="submit">
                Submit
            </button>

            {status === "ERROR" && <p>{error}</p>}
            {status === "FINISHED" && <p>Account created. Please log in.</p>}
        </form>
    )
} 