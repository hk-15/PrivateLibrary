import { useContext, useState } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import ViewCatalogueButton from "../../components/Buttons/ViewCatalogueButton/ViewCatalogueButton";
import { Page } from "../Page/Page";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import SearchResultsTable from "../../components/SearchResultsTable/SearchResultsTable";
import { UserStats } from "../../components/Stats/UserStats/UserStats";
import Stats from "../../components/Stats/Stats";
import "./Home.scss";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

export default function Home() {
    const loginContext = useContext(LoginContext);
    const [searchTerm, setSearchTerm] = useState("");

    if (!loginContext.isLoggedIn) {
        return (
            <Page>
                <h1>Home</h1>
                <LoginMessage />
            </Page>
        )
    };
    return (
        <Page>
            <h1>Home</h1>
            <SearchBar getSearchTerm={setSearchTerm} />
            {searchTerm && <SearchResultsTable searchTerm={searchTerm} />}
            <UserStats username={loginContext.username} />
            <Stats />
            <AddBookButton />
            <ManageCollectionsButton />
            <ViewCatalogueButton />
        </Page>
    )
}