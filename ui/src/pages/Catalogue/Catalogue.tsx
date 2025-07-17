import { useState } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import CatalogueTable from "../../components/Catalogue/CatalogueTable/CatalogueTable";
import { Page } from "../Page/Page";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CatalogueSort } from "../../components/Catalogue/CatalogueSort/CatalogueSort";
import { CataloguePageSize } from "../../components/Catalogue/CataloguePageSize/CataloguePageSize";

export default function Catalogue() {
    const [pageSize, setPageSize] = useState("25");
    const [sortBy, setSortBy] = useState("Title");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Page>
            <h1>Catalogue</h1>
            <AddBookButton/>
            <ManageCollectionsButton/>
            <SearchBar getSearchTerm={setSearchTerm}/>
            <CatalogueSort getSortBy={setSortBy}/>
            <CataloguePageSize getPageSize={setPageSize}/>
            <CatalogueTable pageSize={pageSize} sortBy={sortBy} searchTerm={searchTerm}/>
        </Page>
    );
}