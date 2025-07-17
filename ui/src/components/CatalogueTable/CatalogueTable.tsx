import { useEffect, useState } from "react"
import { getBooks, type Book, type QueryParameters } from "../../api/ApiClient";
import "./CatalogueTable.scss";

export default function CatalogueTable(props:
    {
        params: QueryParameters,
        searchTerm: string
    }) {
    const [toggleButton, setToggleButton] = useState("Show details");
    const [showActions, setShowActions] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks(props.params, props.searchTerm)
            .then(response => setBooks(response))
    }, [books]);

    return (
        <div>
            <button
                onClick={() => {
                    if (toggleButton == "Show details") {
                        setToggleButton("Show actions")
                        setShowActions(false)
                    }
                    else {
                        setToggleButton("Show details")
                        setShowActions(true)
                    }
                }}>
                {toggleButton}
            </button>
            <table>
                <thead>
                    {showActions && (
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Collection</th>
                            <th>Publication year</th>
                            <th>Actions</th>
                        </tr>
                    )}
                    {!showActions && (
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Collection</th>
                            <th>Publication year</th>
                            <th>Edition publication year</th>
                            <th>Language</th>
                            <th>Original language</th>
                            <th>Translator</th>
                            <th>Notes</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map(b =>
                            {return showActions ? ( 
                                <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                    <td>{b.id}</td>
                                    <td>{b.title}</td>
                                    <td>{b.author}</td>
                                    <td>{b.collection}</td>
                                    <td>{b.publicationYear}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Mark as read</button>
                                        <button>Remove</button>
                                    </td>
                                </tr>
                        ) :
                        (
                            <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                <td>{b.id}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.collection}</td>
                                <td>{b.publicationYear}</td>
                                <td>{b.editionPublicationYear}</td>
                                <td>{b.language}</td>
                                <td>{b.originalLanguage}</td>
                                <td>{b.translator}</td>
                                <td>{b.notes}</td>
                            </tr>
                        )}                        
                    )) :
                    (<tr>
                        <td colSpan={10}>No books in the library</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}