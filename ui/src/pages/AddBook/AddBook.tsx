import AddBookForm from "../../components/AddBookForm/AddBookForm";
import { Page } from "../Page/Page";

export default function Catalogue() {
    
    return (
        <Page>
            <h1>Shelve a book</h1>
            <AddBookForm/>
        </Page>
    );
}