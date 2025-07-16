import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import ViewCatalogueButton from "../../components/Buttons/ViewCatalogueButton/ViewCatalogueButton";
import { Page } from "../Page/Page";

export default function Home(){
    return (
        <Page>
            <h1>Home</h1>
            <AddBookButton/>
            <ManageCollectionsButton/>
            <ViewCatalogueButton/>
        </Page>
    )
}