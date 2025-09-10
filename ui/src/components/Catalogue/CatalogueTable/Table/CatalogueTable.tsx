import { useEffect, useState } from "react";
import { deleteBook, emptyBook, getAllCollections, getBooks, updateReadStatus, type Book, type Collection } from "../../../../api/ApiClient";
import { DetailsPopUp } from "../../DetailsPopUp/DetailsPopUp";

export default function CatalogueTable(props:
    {
        pageSize: string,
        sortBy: string,
        searchTerm: string
    }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [nextPageBooks, setNextPageBooks] = useState<Book[]>([]);
    const [pageNum, setPageNum] = useState("1");
    const [changeReadStatusId, setChangeReadStatusId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book>(emptyBook);
    const [refetch, setRefetch] = useState<boolean>(false);
    const [editedBook, setEditedBook] = useState<Book>(emptyBook);

    useEffect(() => {
        getBooks(pageNum, props.pageSize, props.sortBy, props.searchTerm)
            .then(response => {
                setBooks(response)
                setRefetch(false)
                if (editedBook.id !== 0) {
                    setSelectedBook(editedBook);
                    setEditedBook(emptyBook);
                }
            })
            .catch(err => console.error(err));
    }, [props, pageNum, refetch]);

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
            setShowPopUp(false);
        }
    }, [deleteId]);

    return (
        <div className="border-spaced-bottom">
            <table className="library-view-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th className="pub-year">Publication year</th>
                        <th className="collection">Collection</th>
                        <th>Tags</th>
                        <th className="actions"></th>
                        <th className="actions details"></th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? <tr><td>No books to see here...</td></tr> :
                        books.map(b =>
                            <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                                <td><span
                                    className="clickable"
                                    onClick={() => {
                                        setSelectedBook(b)
                                        setShowPopUp(true)
                                    }}>{b.title}</span></td>
                                <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                                <td>{b.publicationYear}</td>
                                <td>{b.collection}</td>
                                <td>{b.tags.map(tag => <span className="tag" key={tag} >{tag}</span>)}</td>
                                <td className="actions">
                                    <button
                                        onClick={() => setChangeReadStatusId(b.id)}
                                    >{`${b.read ? 'Mark unread' : 'Mark read'}`}</button>
                                </td>
                                <td className="actions details">
                                    <button
                                        onClick={() => {
                                            setSelectedBook(b)
                                            setShowPopUp(true)
                                        }}
                                    >Details
                                    </button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            <DetailsPopUp showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)} book={selectedBook} collections={collections} getDeleteId={setDeleteId} getSaveStatus={setRefetch} getEditedBook={setEditedBook}/>

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