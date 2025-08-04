import { useContext } from "react"
import { LoginContext } from "../../LoginManager/LoginManager"

export default function LogOutButton(){
    const loginContext = useContext(LoginContext);

    return (
        <button onClick={loginContext.logOut}>
            Log out
        </button>
    )
}