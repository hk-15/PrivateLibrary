import type { Book } from "../../../../api/ApiClient"

type Props = {
    books: Book[]
    getSelectedId: (id: number) => void
};

export const LibraryView: React.FC<Props> = ({ books, getSelectedId }) => {
    return (
        <table className="library-view-table">
            <thead>
                <tr>
                    <th className="isbn">ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th className="pub-year">Publication year</th>
                    <th className="collection">Collection</th>
                    <th>Tags</th>
                    <th className="actions"></th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 ? <tr><td>No books to see here...</td></tr> :
                    books.map(b =>
                        <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                            <td>{b.isbn}</td>
                            <td>{b.title}</td>
                            <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                            <td>{b.publicationYear}</td>
                            <td>{b.collection}</td>
                            <td>{b.tags.join(', ')}</td>
                            <td>
                                <button
                                    onClick={() => getSelectedId(b.id)}
                                >{`${b.read ? 'Mark unread' : 'Mark read'}`}</button>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
};