import { useContext } from "react";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import { PendingTransfers } from "../../components/Transfers/PendingTransfers/PendingTransfers";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

export default function Transfers() {
    const loginContext = useContext(LoginContext);

    if(!loginContext.isLoggedIn) {
        return (
            <Page>
                <LoginMessage />
            </Page>
        )
    };

    return (
        <Page>
            <h1 className="border-spaced-bottom">Transfers</h1>
            <PendingTransfers currentUser={loginContext.username} />
        </Page>
    )
}