import { useContext, useState } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import CatalogueTable from "../../components/Catalogue/CatalogueTable/Table/CatalogueTable";
import { Page } from "../Page/Page";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CatalogueSort } from "../../components/Catalogue/CatalogueSort/CatalogueSort";
import { CataloguePageSize } from "../../components/Catalogue/CataloguePageSize/CataloguePageSize";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import "./Catalogue.scss";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

export default function Catalogue() {
    const [pageSize, setPageSize] = useState("25");
    const [sortBy, setSortBy] = useState("Title");
    const [searchTerm, setSearchTerm] = useState("");
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
            <h1 className="border-spaced-bottom">Catalogue</h1>
            <div className="catalogue-options-container border-spaced-bottom">
                <SearchBar getSearchTerm={setSearchTerm} />
                <CatalogueSort getSortBy={setSortBy} />
                <CataloguePageSize getPageSize={setPageSize} />
            </div>
            <CatalogueTable pageSize={pageSize} sortBy={sortBy} searchTerm={searchTerm} />
            <div className="border-spaced-bottom">
                <AddBookButton />
                <ManageCollectionsButton />
            </div>
        </Page>
    );
}