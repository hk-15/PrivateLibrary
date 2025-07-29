import { useEffect, useState } from "react";
import { DeleteBook, getAllCollections, getBooks, updateBookDetails, updateReadStatus, type Book, type BookRequest, type Collection } from "../../../api/ApiClient";
import "./CatalogueTable.scss";

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
    library: ''
};

type CommaSeparatedField = 'tags' | 'authors';

export default function CatalogueTable(props:
    {
        pageSize: string,
        sortBy: string,
        searchTerm: string
    }) {
    const [showEdit, setShowEdit] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [nextPageBooks, setNextPageBooks] = useState<Book[]>([]);
    const [pageNum, setPageNum] = useState("1");
    const [selectedBook, setSelectedBook] = useState({
        id: 0,
        changeReadStatus: false,
        edit: false,
        delete: false
    });
    const [editedBookData, setEditedBookData] = useState<Book>(emptyBook);
    const [rawInputs, setRawInputs] = useState({"tags": "", "authors": ""});
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
            .then(response => setBooks(response))
            .catch((err) => console.error(err));
    }, [props, pageNum]);

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response.sort((a, b) => a.name.localeCompare(b.name)))})
            .catch((err) => console.error(err));
    }, [books]);

    function prevPage(page: string) {
        let pageNum = +page;
        pageNum--;
        return pageNum.toString();
    }

    function nextPage(page: string) {
        let pageNum = +page;
        pageNum++;
        return pageNum.toString();
    }

    function checkMaxPage() {
        useEffect(() => {
            getBooks(nextPage(pageNum), props.pageSize, props.sortBy, props.searchTerm)
                .then(response => setNextPageBooks(response));
        }, [props, pageNum]);
        return nextPageBooks.length === 0 ? true : false;
    }
    
    useEffect(() => {
        if(selectedBook.changeReadStatus) {
            const doUpdate = async () => {
                try {
                    await updateReadStatus(selectedBook.id);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to update or fetch books: ", err);
                }
            };
        doUpdate();
        setSelectedBook(prev => ({
            ...prev,
            changeReadStatus: false,
            id: 0
        })
        );
        }
    }, [selectedBook.changeReadStatus]);
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedBookData(prev => ({
            ...prev,
            [name]: name === "publicationYear" ? Number(value) : value
        }));
    };

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

        setEditedBookData(prev => ({
            ...prev,
            [fieldName]: parsed,
        }));
    };
    
    useEffect(() => {
        if(selectedBook.edit && editedBookData) {
            const doUpdate = async () => {
                try {
                    const bookUpdate: BookRequest = {
                        isbn: editedBookData.isbn,
                        title: editedBookData.title,
                        subtitle: editedBookData.subtitle ?? "",
                        authors: editedBookData.authors,
                        translator: editedBookData.translator ?? "",
                        language: editedBookData.language,
                        originalLanguage: editedBookData.originalLanguage ?? "",
                        collectionId: collections.find(c => c.name === editedBookData.collection)?.id ?? 0,
                        read: editedBookData.read,
                        publicationYear: editedBookData.publicationYear,
                        notes: editedBookData.notes ?? "",
                        tags: editedBookData.tags,
                        libraryId: 1 //hard-coded for now, to be passed down from props
                    };
                    await updateBookDetails(editedBookData.id, bookUpdate);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to update or fetch books: ", err);
                }
            };
            doUpdate();
            setSelectedBook(prev => ({
                ...prev,
                edit: false,
                id: 0
            }));
            setEditedBookData(emptyBook);
        }
    }, [selectedBook.edit])
    
    useEffect(() => {
        if (selectedBook.delete) {
            const doUpdate = async () => {
                try {
                    await DeleteBook(selectedBook.id);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to delete book: ", err);
                }
            };
            doUpdate();
            setSelectedBook(prev => ({
                ...prev,
                id: 0,
                delete: false
            }));
        }
    }, [selectedBook.delete]);

    return (
        <div>
            <button
                onClick={() => {
                    if (!showEdit) {
                        setShowEdit(true)
                    }
                    else {
                        setShowEdit(false)
                    }
                }}>
                {showEdit ? "Library view" : "Edit view"}
            </button>
            <table>
                <thead>
                    {!showEdit && (
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Collection</th>
                            <th>Publication year</th>
                            <th>Tags</th>
                        </tr>
                    )}
                    {showEdit && (
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Author</th>
                            <th>Collection</th>
                            <th>Publication year</th>
                            <th>Language</th>
                            <th>Original language</th>
                            <th>Translator</th>
                            <th>Notes</th>
                            <th>Tags</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {books.length === 0 ?
                        (<tr>
                            <td colSpan={10}>No books in the library</td>
                        </tr>) :
                        (
                        books.map(b =>
                            {return !showEdit ? ( 
                                <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                    <td>{b.isbn}</td>
                                    <td>{b.title}</td>
                                    <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                                    <td>{b.collection}</td>
                                    <td>{b.publicationYear}</td>
                                    <td>{b.tags.join(', ')}</td>
                                    <td>
                                        <button
                                            onClick={() => setSelectedBook(prev => ({
                                                ...prev,
                                                changeReadStatus: true,
                                                id: b.id
                                            }))}                                        >{`${b.read ? 'Mark unread' : 'Mark read'}`}</button>
                                    </td>
                                </tr>
                                ) :
                                (editedBookData.id !== b.id ? (
                                    <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                    <td>{b.isbn}</td>
                                    <td>{b.title}</td>
                                    <td>{b.subtitle}</td>
                                    <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                                    <td>{b.collection}</td>
                                    <td>{b.publicationYear}</td>
                                    <td>{b.language}</td>
                                    <td>{b.originalLanguage}</td>
                                    <td>{b.translator}</td>
                                    <td>{b.notes}</td>
                                    <td>{b.tags.join(', ')}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setEditedBookData(b);
                                                setRawInputs({"tags": b.tags.join(", "), "authors": b.authors.join(", ")});
                                            }}
                                        >Edit</button>
                                        <button
                                        onClick={() => {
                                            setPopup(true)
                                            setSelectedBook(prev => ({
                                                ...prev,
                                                id: b.id
                                            }))
                                        }}
                                        >Remove</button>
                                        {popup && selectedBook.id === b.id ?
                                        <span>Are you sure?
                                        <button
                                        onClick={() => {
                                            setSelectedBook(prev => ({
                                                ...prev,
                                                delete: true
                                            }))
                                            setPopup(false)}
                                        }
                                        >Yes</button>
                                        <button
                                        onClick={() => {
                                            setPopup(false)
                                            setSelectedBook(prev => ({
                                                ...prev,
                                                id: 0
                                            }))
                                        }}
                                        >Cancel</button>
                                        </span>
                                        : ""}
                                    </td>
                                </tr>  
                                ) : (
                                <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                       <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="isbn"
                                                value={editedBookData.isbn}
                                                onChange={handleInput}
                                            />
                                            </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="title"
                                                value={editedBookData.title}
                                                onChange={handleInput}
                                            />
                                        </td>
                                         <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="subtitle"
                                                value={editedBookData.subtitle ?? ""}
                                                onChange={handleInput}
                                            />
                                        </td>
                                         <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="authors"
                                                value={rawInputs.authors}
                                                onChange={handleCommaSeparatedInput}
                                            />
                                        </td>
                                         <td>
                                            <select name="collection"
                                            onChange={handleInput}>
                                                {[...collections]
                                                .sort((a, c) => (a.name === b.collection ? -1 : c.name === b.collection ? 1 : 0))
                                                .map(collection => (
                                                    <option key={collection.id} value={collection.name}>
                                                    {collection.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="number"
                                                name="publicationYear"
                                                value={editedBookData.publicationYear}
                                                onChange={handleInput}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="language"
                                                value={editedBookData.language}
                                                onChange={handleInput}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="originalLanguage"
                                                value={editedBookData.originalLanguage ?? ""}
                                                onChange={handleInput}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="translator"
                                                value={editedBookData.translator ?? ""}
                                                onChange={handleInput}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="notes"
                                                value={editedBookData.notes ?? ""}
                                                onChange={handleInput}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                key={b.id}
                                                className="edit-book"
                                                type="text"
                                                name="tags"
                                                value={rawInputs.tags}
                                                onChange={handleCommaSeparatedInput}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => setSelectedBook(prev => ({
                                                    ...prev,
                                                    id: b.id,
                                                    edit: true
                                                }))}
                                            >Save</button>
                                            <button
                                                onClick={() => setEditedBookData(emptyBook)}>
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                            ))}                        
                        ))
                    }
                </tbody>
            </table>
            <button
                onClick={() => setPageNum(prevPage(pageNum))}
                disabled={pageNum === "1"}
                >
                &lt;
            </button>
            {pageNum}
            <button
                onClick={() => setPageNum(nextPage(pageNum))}
                disabled={checkMaxPage()}
                > &gt; </button>
        </div>
    )
}