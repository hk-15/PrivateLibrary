import { useEffect, useState } from "react";
import { emptyBook, type Book, type Collection } from "../../../api/ApiClient";
import { EditDetails } from "../EditDetails/EditDetails";

type Props = {
    showPopUp: boolean,
    closePopUp: () => void,
    book: Book,
    getEditedBook: (book: Book) => void,
    collections: Collection[],
    getDeleteId: (id: number) => void,
}

export const DetailsPopUp: React.FC<Props> = ({ showPopUp, closePopUp, book, getEditedBook, collections, getDeleteId }) => {
    const [commaSeparatedInputs, setCommaSeparatedInputs] = useState({ "tags": "", "authors": "" });
    const [editedBook, setEditedBook] = useState(emptyBook);
    const [saveStatus, setSaveStatus] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);

    useEffect(() => {
        if (editedBook.id !== 0 && saveStatus === true) {
            getEditedBook(editedBook);

            if (saveStatus === true) {
                setEditedBook(emptyBook);
                setSaveStatus(false);
            }
        }
    }, [editedBook]);

    if (!showPopUp) { return null }
    return (
        <div className="PopUp" >
            <button className="close-button" onClick={closePopUp}>x</button>
            {editedBook.id === 0 ?
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="first-col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={book.id}>
                                <td className="first-col">ISBN</td>
                                <td>{book.isbn}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Title</td>
                                <td>{book.title}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Subtitle</td>
                                <td>{book.subtitle}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Author</td>
                                <td>{book.authors.join(', ')}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Publication Year</td>
                                <td>{book.publicationYear}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Language</td>
                                <td>{book.language}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Original Language</td>
                                <td>{book.originalLanguage}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Translator</td>
                                <td>{book.translator}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Collection</td>
                                <td>{book.collection}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Notes</td>
                                <td>{book.notes}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Tags</td>
                                <td>{book.tags.map(tag => (<span className="tag" key={tag}> {tag} </span>))}</td>
                            </tr>
                            <tr>
                                <td className="first-col">Read?</td>
                                <td>{book.read ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                    {!deleteMessage ?
                    <div className="actions-container">
                        <button
                            onClick={() => {
                                setEditedBook(book)
                                setCommaSeparatedInputs({ "tags": book.tags.join(", "), "authors": book.authors.join(", ") });
                            }}>
                            Edit
                        </button>
                        <button
                            className="red-button"
                            onClick={() => setDeleteMessage(true)}
                        >Remove
                        </button>
                    </div> :
                        <div>
                            <p>Remove <em>{book.title}</em> from your library?</p>
                            <button
                                onClick={() => {
                                    getDeleteId(book.id)
                                    setDeleteMessage(false)
                                }}
                            >Yes</button>
                            <button
                                onClick={() => setDeleteMessage(false)}
                            >Cancel</button>
                        </div>}
                </div> :
                <div>
                    <EditDetails book={editedBook} commaSeparatedInputs={commaSeparatedInputs} getEditedBook={setEditedBook} getSaveStatus={setSaveStatus} collections={collections} />
                </div>
            }
        </div >
    );
};