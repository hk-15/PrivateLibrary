import { useEffect, useState } from "react";
import { getBooks, type Book, type Collection } from "../../../api/ApiClient";
import { Collapsible } from "../Collapsible/Collapsible";

type Props = {
    collections: Collection[]
}

export const CollectionsManagement: React.FC<Props> = ({ collections }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [fetchBooks, setFetchBooks] = useState(false);
    const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

    useEffect(() => {
        getBooks("", "", "", "")
            .then(response => setBooks(response))
            .catch(err => console.error(err))
            setFetchBooks(false);
    }, [fetchBooks]);

    useEffect(() => {
        setSortedCollections(collections.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
    }, [collections])

    return (
        <div className="border-spaced-bottom">
            {sortedCollections.map(collection => {
                return <Collapsible key={collection.id} open={false} header={collection.name} books={books.filter(b => b.collection === collection.name)} collections={collections} getRefresh={setFetchBooks}/>
            })}
        </div>
    )
};