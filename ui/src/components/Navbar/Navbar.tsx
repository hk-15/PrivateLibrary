import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
import { LoginContext } from "../LoginManager/LoginManager";

export function Navbar () {
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <nav className="nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/login">Log in</NavLink>
        </nav>
        )
    }

    return (
        <nav className="nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/catalogue">Catalogue</NavLink>
            <NavLink className="nav-link" to="/add-book">Shelve a book</NavLink>
            <NavLink className="nav-link" to="/collections">Collections</NavLink>
            <NavLink className="nav-link" to="/transfers">Transfers</NavLink>
            <NavLink className="nav-link" to="/login">Log out?</NavLink>
        </nav>
    )
};