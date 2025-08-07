import { createContext, useEffect, useState, type JSX, type ReactNode } from "react";

export interface LoginContextType {
    isLoggedIn: boolean;
    isUserAdmin: boolean;
    username: string;
    logIn: (userAdmin: boolean, username: string) => void;
    logOut?: () => void;
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    isUserAdmin: false,
    username: "",
    logIn: () => {},
    logOut: () => {},
});

interface LoginManagerProps {
    children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [, setIsLoggedIn] = useState(false)
    const [, setIsUserAdmin] = useState(false)
    const [, setUsername] = useState<string>("");

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("loggedIn") === "true";
        const admin = sessionStorage.getItem("isAdmin") === "true";
        const username = sessionStorage.getItem("username") || "";
        setIsLoggedIn(loggedIn);
        setIsUserAdmin(admin);
        setUsername(username);
    }, []);
    
    function logIn(userAdmin: boolean, username: string) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("isAdmin", JSON.stringify(userAdmin));
        sessionStorage.setItem("username", JSON.stringify(username));
        setIsLoggedIn(true);
        setIsUserAdmin(userAdmin);
        setUsername(username);
    }

    function logOut() {
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("isAdmin", "false");
        sessionStorage.setItem("username", "");
        setIsLoggedIn(false);
        setIsUserAdmin(false);
        setUsername("");
    }

    function generateContextObject() {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        const isAdmin = sessionStorage.getItem("isAdmin");
        const username = sessionStorage.getItem("username");

        return {
        isLoggedIn: isLoggedIn ? JSON.parse(isLoggedIn) : false,
        isUserAdmin: isAdmin ? JSON.parse(isAdmin) : false,
        username: username ? JSON.parse(username) : "",
        logIn: logIn,
        logOut: logOut,
        };
    }

    return (
        <LoginContext.Provider value={generateContextObject()}>
            {props.children}
        </LoginContext.Provider>
    );
};