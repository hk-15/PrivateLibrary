import { useContext } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import ViewCatalogueButton from "../../components/Buttons/ViewCatalogueButton/ViewCatalogueButton";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";

export default function Home(){
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <Page>
                <h1>Home</h1>
                <p>Please <a href="/login">log in</a></p>
            </Page>
        )
    };
    return (
        <Page>
            <h1>Home</h1>
            <AddBookButton/>
            <ManageCollectionsButton/>
            <ViewCatalogueButton/>
        </Page>
    )
}