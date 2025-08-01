import type { Book } from "../../../../api/ApiClient"

type Props = {
    books: Book[]
    getSelectedId: (id: number) => void
};

export const LibraryView: React.FC<Props> = ({ books, getSelectedId }) =>
{
    return (
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Collection</th>
                    <th>Publication year</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {books.map(b => 
                    <tr key={b.id} className={`${b.read ? 'marked-read' : ''}`}>
                        <td>{b.isbn}</td>
                        <td>{b.title}</td>
                        <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                        <td>{b.collection}</td>
                        <td>{b.publicationYear}</td>
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