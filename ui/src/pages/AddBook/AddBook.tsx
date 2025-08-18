import { useContext } from "react";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import "./AddBook.scss";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

export default function Catalogue() {
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <Page>
                <LoginMessage />
            </Page>
        )
    };

    return (
        <Page>
            <h1>Shelve a book</h1>
            <AddBookForm />
        </Page>
    );
}