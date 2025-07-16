import { useEffect, useState } from "react"
import { getAllBooks, type Book } from "../../api/ApiClient";
import "./CatalogueTable.scss";

export default function CatalogueTable() {
    const [books, setBooks] = useState<Book[]>([]);
    const [toggleButton, setToggleButton] = useState("Show details");
    const [showActions, setShowActions] = useState(true);

    useEffect(() => {
        getAllBooks().then((response) => setBooks(response))
    }, []);
    
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
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Collection</th>
                        <th>Publication year</th>
                        {showActions && (
                            <th>Actions</th>
                        )}
                        {!showActions && (
                            <div>
                                <th>Edition publication year</th>
                                <th>Language</th>
                                <th>Original language</th>
                                <th>Translator</th>
                                <th>Notes</th>
                            </div>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map(b => 
                        <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                            <td>{b.id}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.collection}</td>
                            <td>{b.publicationYear}</td>
                            {showActions && (
                            <td>
                                <button>Edit</button>
                                <button>Mark as read</button>
                                <button>Delete</button>
                            </td>
                        )}
                        {!showActions && (
                            <div>
                                <td>{b.editionPublicationYear}</td>
                                <td>{b.language}</td>
                                <td>{b.originalLanguage}</td>
                                <td>{b.translator}</td>
                                <td>{b.notes}</td>
                            </div>
                        )}
                        </tr>
                        
                    )) : (<p>No books in the library</p>)}
                </tbody>
            </table>
        </div>
    )
}