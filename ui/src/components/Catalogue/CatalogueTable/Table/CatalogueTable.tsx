import { useEffect, useState } from "react";
import { deleteBook, getAllCollections, getBooks, updateBookDetails, updateReadStatus, type Book, type BookRequest, type Collection } from "../../../../api/ApiClient";
import { LibraryView } from "../LibraryView/LibraryView";
import { EditView } from "../EditView/EditView";

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
    const [changeReadStatusId, setChangeReadStatusId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const [editedBook, setEditedBook] = useState(emptyBook);

    useEffect(() => {
        getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
            .then(response => setBooks(response))
            .catch(err => console.error(err));
    }, [props, pageNum]);

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response.sort((a, b) => a.name.localeCompare(b.name)))
            })
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
        if (changeReadStatusId) {
            const doUpdate = async () => {
                try {
                    await updateReadStatus(changeReadStatusId);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to update or fetch books: ", err);
                }
            };
            doUpdate();
            setChangeReadStatusId(0);
        }
    }, [changeReadStatusId]);

    useEffect(() => {
        if (editedBook !== emptyBook) {
            const doUpdate = async () => {
                try {
                    const bookUpdate: BookRequest = {
                        isbn: editedBook.isbn,
                        title: editedBook.title,
                        subtitle: editedBook.subtitle ?? "",
                        authors: editedBook.authors,
                        translator: editedBook.translator ?? "",
                        language: editedBook.language,
                        originalLanguage: editedBook.originalLanguage ?? "",
                        collectionId: collections.find(c => c.name === editedBook.collection)?.id ?? 0,
                        read: editedBook.read,
                        publicationYear: editedBook.publicationYear,
                        notes: editedBook.notes ?? "",
                        tags: editedBook.tags
                    };
                    await updateBookDetails(editedBook.id, bookUpdate);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to update or fetch books: ", err);
                }
            };
            doUpdate();
            setEditedBook(emptyBook);
        }
    }, [editedBook])

    useEffect(() => {
        if (deleteId) {
            const doUpdate = async () => {
                try {
                    await deleteBook(deleteId);
                    await getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
                        .then(response => setBooks(response));
                } catch (err) {
                    console.error("Failed to delete book: ", err);
                }
            };
            doUpdate();
            setDeleteId(0);
        }
    }, [deleteId]);

    return (
        <div className="catalogue-and-nav-container">
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

            <div className={!showEdit ? "catalogue-table-container" : ""}>
                {!showEdit && <LibraryView books={books} getSelectedId={setChangeReadStatusId} />}
            </div>
            <div className={showEdit ? "catalogue-table-container" : ""}>
                {showEdit && <EditView books={books} collections={collections} getEditedBook={setEditedBook} getDeleteId={setDeleteId} />}
            </div>

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