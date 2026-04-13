import { useContext, useState } from "react";
import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import { Page } from "../Page/Page";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CatalogueSort } from "../../components/Catalogue/CatalogueSort/CatalogueSort";
import { CataloguePageSize } from "../../components/Catalogue/CataloguePageSize/CataloguePageSize";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import "./Catalogue.scss";
import { LoginMessage } from "../../components/LoginMessage/LoginMessage";
import CatalogueTable from "../../components/Catalogue/CatalogueTable/CatalogueTable";
import { CatalogueFilter } from "../../components/Catalogue/CatalogueFilter/CatalogueFilter";

export default function Catalogue() {
  const [pageSize, setPageSize] = useState("25");
  const [sortBy, setSortBy] = useState("Title");
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const loginContext = useContext(LoginContext);

  return (
    <Page>
      <h1 className="border-spaced-bottom">Catalogue</h1>
      {!loginContext.isLoggedIn && (
        <LoginMessage message="to view your own catalogue and access full functionality" />
      )}
      <div className="catalogue-options-container border-spaced-bottom">
        <SearchBar getSearchTerm={setSearchTerm} />
        <CatalogueSort getSortBy={setSortBy} />
        <CatalogueFilter getFilter={setFilter} />
        <CataloguePageSize getPageSize={setPageSize} />
      </div>
      <CatalogueTable
        pageSize={pageSize}
        sortBy={sortBy}
        filter={filter}
        searchTerm={searchTerm}
      />
      <div className="border-spaced-bottom">
        <AddBookButton />
        <ManageCollectionsButton />
      </div>
    </Page>
  );
}
