import AddBookForm from "../../components/AddBookForm/AddBookForm";
import { Page } from "../Page/Page";

export default function Catalogue() {
    
    return (
        <Page>
            <h1>Add a book to the library</h1>
            <AddBookForm/>
        </Page>
    );
}