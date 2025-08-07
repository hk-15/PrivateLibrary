import { useContext } from "react";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import { PendingTransfers } from "../../components/Transfers/PendingTransfers/PendingTransfers";

export default function Transfers() {
    const loginContext = useContext(LoginContext);

    if(!loginContext.isLoggedIn) {
        return (
            <Page>
                <h1>Home</h1>
                <p>Please <a href="/login">log in</a></p>
            </Page>
        )
    };

    return (
        <Page>
            <h1>Transfers</h1>
            <PendingTransfers currentUser={loginContext.username} />
        </Page>
    )
}