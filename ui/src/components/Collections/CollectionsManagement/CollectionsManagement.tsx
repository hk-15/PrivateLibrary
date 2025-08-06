import { useEffect, useState } from "react";
import { getBooks, type Book } from "../../../api/ApiClient";
import { Collapsible } from "../../Buttons/Collapsible/Collapsible";

type Props = {
    collections: string[]
}

export const CollectionsManagement: React.FC<Props> = ({ collections }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks("0", "", "", "")
            .then(response => setBooks(response))
            .catch(err => console.error(err))
    }, [collections]);
    
    return (
        <div>
            {collections.sort().map(collection => {
                return <Collapsible key={collection} open={false} header={collection} books={books.filter(b => b.collection === collection)} />
            })}
        </div>
    )
};