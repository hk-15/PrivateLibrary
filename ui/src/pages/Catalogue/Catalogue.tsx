import AddBookButton from "../../components/Buttons/AddBookButton/AddBookButton";
import ManageCollectionsButton from "../../components/Buttons/ManageCollectionsButton/ManageCollectionsButton";
import { Page } from "../Page/Page";

export default function Catalogue() {
    
    return (
        <Page>
            <h1>Catalogue</h1>
            <AddBookButton/>
            <ManageCollectionsButton/>
        </Page>
    );
}