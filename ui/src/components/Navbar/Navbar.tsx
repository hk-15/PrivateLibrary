import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export function Navbar () {
    return (

        <nav className="nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/catalogue">Catalogue</NavLink>
            <NavLink className="nav-link" to="/add-book">Shelve a book</NavLink>
            <NavLink className="nav-link" to="/collections">Collections</NavLink>
            <NavLink className="nav-link" to="/">Transfers</NavLink>
            <NavLink className="nav-link" to="/login">Log in</NavLink>
        </nav>
    )
};