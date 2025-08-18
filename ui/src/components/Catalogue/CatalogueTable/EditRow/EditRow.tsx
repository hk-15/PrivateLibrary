import { useState } from "react";
import type { Book, Collection } from "../../../../api/ApiClient";

type Props = {
    book: Book,
    commaSeparatedInputs: {"tags": string, "authors": string},
    collections: Collection[],
    getEditedBook: (book: Book) => void,
    getSaveStatus: (status: boolean) => void
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

type CommaSeparatedField = 'tags' | 'authors';

export const EditRow: React.FC<Props> = ({ book, commaSeparatedInputs, collections, getEditedBook, getSaveStatus }) => {
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
            [name]: name === "publicationYear" ? Number(value) : value
        }));
    };

    return (
        <tr key={book.id} className={`${book.read ? 'marked-read' : ''} edit-row`}>
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
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="title"
                    value={editedBook.title}
                    onChange={handleInput}
                />
            </td>
                <td>
                <input
                    key={book.id}
                    type="text"
                    name="subtitle"
                    value={editedBook.subtitle ?? ""}
                    onChange={handleInput}
                />
            </td>
                <td>
                <input
                    key={book.id}
                    type="text"
                    name="authors"
                    value={rawInputs.authors}
                    onChange={handleCommaSeparatedInput}
                />
            </td>
            <td>
                <input
                    key={book.id}
                    type="number"
                    name="publicationYear"
                    value={editedBook.publicationYear}
                    onChange={handleInput}
                />
            </td>
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="language"
                    value={editedBook.language}
                    onChange={handleInput}
                />
            </td>
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="originalLanguage"
                    value={editedBook.originalLanguage ?? ""}
                    onChange={handleInput}
                />
            </td>
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="translator"
                    value={editedBook.translator ?? ""}
                    onChange={handleInput}
                />
            </td>
            <td>
                <select key={book.id} name="collection"
                onChange={handleInput}>
                    {[...collections]
                    .sort((a, c) => (a.name === book.collection ? -1 : c.name === book.collection ? 1 : 0))
                    .map(collection => (
                        <option key={collection.id} value={collection.name}>
                        {collection.name}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="notes"
                    value={editedBook.notes ?? ""}
                    onChange={handleInput}
                />
            </td>
            <td>
                <input
                    key={book.id}
                    type="text"
                    name="tags"
                    value={rawInputs.tags}
                    onChange={handleCommaSeparatedInput}
                />
            </td>
            <td>
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
                    }}>
                Cancel
                </button>
            </td>
        </tr> 
    )
}
