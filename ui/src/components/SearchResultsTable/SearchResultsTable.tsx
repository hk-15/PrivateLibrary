import { useEffect, useState } from "react";
import { getAllBooks, type Book } from "../../api/ApiClient";

export default function SearchResultsTable(props:
    {
        searchTerm: string
    }) {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getAllBooks(props.searchTerm)
            .then(response => setBooks(response))
            .catch((err) => console.error(err));
    }, [props]);

    return (
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publication Year</th>
                    <th>Collection</th>
                    <th>Owner</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 ? <tr><td>No books to see here...</td></tr> :
                    books.map(b =>
                        <tr key={b.id}>
                            <td>{b.isbn}</td>
                            <td>{b.title}</td>
                            <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                            <td>{b.publicationYear}</td>
                            <td>{b.collection}</td>
                            <td>{b.owner}</td>
                            <td>{b.tags.join(', ')}</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}