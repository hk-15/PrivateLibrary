import { useContext } from "react"
import { LoginContext } from "../../LoginManager/LoginManager"
import { logOut } from "../../../api/ApiClient";

export default function LogOutButton() {
    const loginContext = useContext(LoginContext);

    const performLogOut = async () => {
        try {
            await logOut()
            loginContext.logOut();
            window.location.href = "/login";
        } catch (err) {
            console.error(err);
            alert("Something went wrong while logging out.");
        }
    };

    return (
        <button className="account-button" onClick={performLogOut}>
            Log out
        </button>
    )
}