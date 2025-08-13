import { useEffect, useState } from "react";
import type { Book, Collection } from "../../../../api/ApiClient"
import { EditRow } from "../EditRow/EditRow";

type Props = {
    books: Book[],
    collections: Collection[],
    getEditedBook: (book: Book) => void,
    getDeleteId: (id: number) => void
};

const emptyBook: Book = {
    id: 0,
    isbn: '',
    title: '',
    subtitle: '',
    authors: [''],
    translator: '',
    language: '',
    originalLanguage: '',
    collection: '',
    publicationYear: 0,
    notes: '',
    tags: [''],
    read: false,
    owner: ''
};

export const EditView: React.FC<Props> = ({ books, collections, getEditedBook, getDeleteId }) => {
    const [popup, setPopup] = useState(false);
    const [commaSeparatedInputs, setCommaSeparatedInputs] = useState({ "tags": "", "authors": "" });
    const [deleteFocus, setDeleteFocus] = useState(0);
    const [editedBook, setEditedBook] = useState(emptyBook);
    const [saveStatus, setSaveStatus] = useState(false);

    useEffect(() => {
        if (editedBook.id !== 0) {
            getEditedBook(editedBook);

            if (saveStatus === true) {
                setEditedBook(emptyBook);
                setSaveStatus(false);
            }
        }
    }, [editedBook]);

    return (
        <table className="edit-view-table">
            <thead>
                <tr>
                    <th className="isbn">ISBN</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Author</th>
                    <th className="pub-year">Publication year</th>
                    <th className="language">Language</th>
                    <th className="language">Original language</th>
                    <th>Translator</th>
                    <th className="collection">Collection</th>
                    <th>Notes</th>
                    <th>Tags</th>
                    <th className="actions"></th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 ? <tr><td>No books to see here...</td></tr> :
                    books.map(b =>
                        editedBook.id !== b.id ? (
                            <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                <td>{b.isbn}</td>
                                <td>{b.title}</td>
                                <td>{b.subtitle}</td>
                                <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                                <td>{b.publicationYear}</td>
                                <td>{b.language}</td>
                                <td>{b.originalLanguage}</td>
                                <td>{b.translator}</td>
                                <td>{b.collection}</td>

                                <td>{b.notes}</td>
                                <td className="tags">{b.tags.join(', ')}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setEditedBook(b)
                                            setCommaSeparatedInputs({ "tags": b.tags.join(", "), "authors": b.authors.join(", ") });
                                        }}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPopup(true)
                                            setDeleteFocus(b.id)
                                        }}>
                                        Remove
                                    </button>
                                    {popup && deleteFocus === b.id ?
                                        <span>Are you sure?
                                            <button
                                                onClick={() => {
                                                    getDeleteId(b.id)
                                                    setPopup(false)
                                                    setDeleteFocus(0)
                                                }
                                                }>
                                                Yes
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setPopup(false)
                                                    setDeleteFocus(0)
                                                }}>
                                                Cancel
                                            </button>
                                        </span>
                                        : ""}
                                </td>
                            </tr>
                        ) : (<EditRow key={b.id} book={editedBook} commaSeparatedInputs={commaSeparatedInputs} getEditedBook={setEditedBook} collections={collections} getSaveStatus={setSaveStatus} />)
                    )}
            </tbody>
        </table>
    );
};