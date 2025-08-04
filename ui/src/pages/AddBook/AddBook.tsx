import { useContext } from "react";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";

export default function Catalogue() {
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <p>Please <a href="/login">log in</a></p>
        )
    };

    return (
        <Page>
            <h1>Shelve a book</h1>
            <AddBookForm/>
        </Page>
    );
}