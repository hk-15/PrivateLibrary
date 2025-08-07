import { useContext, useState } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import ViewCatalogueButton from "../../components/Buttons/ViewCatalogueButton/ViewCatalogueButton";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SearchResultsTable from "../../components/SearchResultsTable/SearchResultsTable";

export default function Home() {
    const loginContext = useContext(LoginContext);
    const [searchTerm, setSearchTerm] = useState("");

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
            <button
            onClick={() => console.log(loginContext.username)}
            >
                Test
            </button>
            <AddBookButton />
            <ManageCollectionsButton />
            <ViewCatalogueButton />
            <SearchBar getSearchTerm={setSearchTerm} />
            {searchTerm && <SearchResultsTable searchTerm={searchTerm} />}
        </Page>
    )
}