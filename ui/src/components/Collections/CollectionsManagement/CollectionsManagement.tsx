import { useEffect, useState } from "react";
import { getBooks, type Book, type Collection } from "../../../api/ApiClient";
import { Collapsible } from "../Collapsible/Collapsible";

type Props = {
    collections: Collection[]
}

export const CollectionsManagement: React.FC<Props> = ({ collections }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [fetchBooks, setFetchBooks] = useState(false);

    useEffect(() => {
        getBooks("", "", "", "")
            .then(response => setBooks(response))
            .catch(err => console.error(err))
            setFetchBooks(false);
    }, [collections, fetchBooks]);
    
    return (
        <div className="border-spaced-bottom">
            {collections.sort().map(collection => {
                return <Collapsible key={collection.id} open={false} header={collection.name} books={books.filter(b => b.collection === collection.name)} collections={collections} getRefresh={setFetchBooks}/>
            })}
        </div>
    )
};