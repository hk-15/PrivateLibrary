import { useContext } from "react";
import AddCollection from "../../components/AddCollection/AddCollection";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";

export default function Collections() {
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <p>Please <a href="/login">log in</a></p>
        )
    };

    return (
        <Page>
            <h1>Collections</h1>
            <AddCollection/>
        </Page>
    )
}