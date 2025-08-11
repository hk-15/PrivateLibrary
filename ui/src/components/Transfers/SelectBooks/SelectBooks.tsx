import { useEffect, useState } from "react";
import { getBooks, type Book } from "../../../api/ApiClient";

type Props = {
    searchTerm: string;
    getSelectedBooks: (books: Book[]) => void;
}

export const SelectBooks: React.FC<Props> = ({ searchTerm, getSelectedBooks }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks("", "", "", searchTerm)
            .then(response => setBooks(response))
            .catch(err => console.error(err));
    }, [searchTerm]);

    useEffect(() => {
        getSelectedBooks(selectedBooks);
    }, [selectedBooks])

    if (!searchTerm) {
        return (
            <p>Search your catalogue</p>
        )
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publication Year</th>
                    <th>Collection</th>
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
                            <td>{b.tags.join(', ')}</td>
                            <td><input type="checkbox" id={b.id.toString()} name={b.id.toString()} onChange={(e) => {
                                setSelectedBooks(prev => {
                                    if (e.target.checked) return [...prev, b];
                                    else return prev.filter(book => book.id !== b.id);
                                })
                            }} /></td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}