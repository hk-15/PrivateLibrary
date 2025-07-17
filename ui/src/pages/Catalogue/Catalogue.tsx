import { useState } from "react";
import type { QueryParameters } from "../../api/ApiClient";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import CatalogueTable from "../../components/CatalogueTable/CatalogueTable";
import { Page } from "../Page/Page";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export default function Catalogue() {
    const [params, setParams] = useState<QueryParameters>({
        pageNum: "1",
        pageSize: "25",
        sortBy: "Title"
    });
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Page>
            <h1>Catalogue</h1>
            <AddBookButton/>
            <ManageCollectionsButton/>
            <SearchBar getSearchTerm={setSearchTerm}/>
            <CatalogueTable params={params} searchTerm={searchTerm}/>
        </Page>
    );
}