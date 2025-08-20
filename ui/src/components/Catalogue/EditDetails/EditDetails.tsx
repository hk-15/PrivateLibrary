import { useState } from "react"
import { emptyBook, type Book, type Collection } from "../../../api/ApiClient"

type Props = {
    book: Book,
    commaSeparatedInputs: { "tags": string, "authors": string },
    getEditedBook: (book: Book) => void,
    getSaveStatus: (status: boolean) => void,
    collections: Collection[],
}

type CommaSeparatedField = "tags" | "authors";

export const EditDetails: React.FC<Props> = ({ book, commaSeparatedInputs, getEditedBook, getSaveStatus, collections }) => {
    const [editedBook, setEditedBook] = useState(book);
    const [rawInputs, setRawInputs] = useState(commaSeparatedInputs);

    const handleCommaSeparatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!["tags", "authors"].includes(name)) return;

        const fieldName = name as CommaSeparatedField;

        setRawInputs(prev => ({
            ...prev,
            [fieldName]: value,
        }));

        const parsed = value
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        setEditedBook(prev => ({
            ...prev,
            [fieldName]: parsed,
        }));
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedBook(prev => ({
            ...prev,
            [name]: name === "publicationYear" ? Number(value) : name === "read" ? value === "true" : value
        }));
    };

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th className="first-col"></th>
                </tr>
            </thead>
            <tbody>
                <tr key={book.id}>
                    <td>ISBN</td>
                    <td>
                        <input
                            key={book.id}
                            className="isbn"
                            type="text"
                            name="isbn"
                            value={editedBook.isbn}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="title"
                            value={editedBook.title}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Subtitle</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="subtitle"
                            value={editedBook.subtitle ?? ""}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="authors"
                            value={rawInputs.authors}
                            onChange={handleCommaSeparatedInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Publication Year</td>
                    <td>
                        <input
                            key={book.id}
                            type="number"
                            name="publicationYear"
                            value={editedBook.publicationYear}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="language"
                            value={editedBook.language}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Original Language</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="originalLanguage"
                            value={editedBook.originalLanguage ?? ""}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Translator</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="translator"
                            value={editedBook.translator ?? ""}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Collection</td>
                    <td>
                        <select key={book.id} name="collection"
                            onChange={handleInput}>
                            {[...collections]
                                .sort((a, b) => (a.name === book.collection ? -1 : b.name === book.collection ? 1 : 0))
                                .map(collection => (
                                    <option key={collection.id} value={collection.name}>
                                        {collection.name}
                                    </option>
                                ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Notes</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="notes"
                            value={editedBook.notes ?? ""}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Tags</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="tags"
                            value={rawInputs.tags}
                            onChange={handleCommaSeparatedInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Read?</td>
                    <td>
                        <label>
                        Yes
                        <input
                            name="read"
                            type="radio"
                            value="true"
                            checked={editedBook.read === true}
                            onChange={handleInput}
                        />
                        </label>
                        <label>
                        No
                        <input
                            name="read"
                            type="radio"
                            value="false"
                            checked={editedBook.read === false}
                            onChange={handleInput}
                        />
                        </label>
                    </td> 
                </tr>
            </tbody>
        </table>
        <div>
            <button
                className="green-button"
                onClick={() => {
                    getEditedBook(editedBook)
                    setEditedBook(emptyBook)
                    getSaveStatus(true);
                }}
            >Save</button>
            <button
                onClick={() => {
                    setEditedBook(emptyBook)
                    getEditedBook(emptyBook)
                }}>Cancel</button>
        </div>
        </div>
    )
}