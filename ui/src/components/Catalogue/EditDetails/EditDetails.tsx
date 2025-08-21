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

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
                    <th className="first-col">Edit details</th>
                </tr>
            </thead>
            <tbody>
                <tr key={book.id}>
                    <td className="first-col">ISBN</td>
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
                    <td className="first-col">Title</td>
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
                    <td className="first-col">Subtitle</td>
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
                    <td className="first-col">Author</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="authors"
                            value={rawInputs.authors}
                            onChange={handleCommaSeparatedInput}
                        />
                        <span className="input-tip">Tip: separate authors with a comma</span>
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Publication Year</td>
                    <td>
                        <input
                            key={book.id}
                            type="number"
                            name="publicationYear"
                            className="publication-year"
                            value={editedBook.publicationYear}
                            onChange={handleInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Language</td>
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
                    <td className="first-col">Original Language</td>
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
                    <td className="first-col">Translator</td>
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
                    <td className="first-col">Collection</td>
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
                    <td className="first-col">Notes</td>
                    <td>
                        <textarea
                            key={book.id}
                            name="notes"
                            value={editedBook.notes ?? ""}
                            onChange={handleInput}
                        ></textarea>
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Tags</td>
                    <td>
                        <input
                            key={book.id}
                            type="text"
                            name="tags"
                            value={rawInputs.tags}
                            onChange={handleCommaSeparatedInput}
                        />
                        <span className="input-tip">Tip: separate tags with a comma</span>
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Read?</td>
                    <td>
                        <label>
                        Yes
                        <input
                            name="read"
                            type="radio"
                            value="true"
                            className="read-radio"
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
                            className="read-radio"
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