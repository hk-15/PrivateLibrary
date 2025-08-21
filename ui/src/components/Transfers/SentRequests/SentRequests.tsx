import { deleteTransfer, type Transfer } from "../../../api/ApiClient";

type Props = {
    requests: Transfer[];
    getRefresh: (boolean: boolean) => void;
}

export const SentRequests: React.FC<Props> = ({ requests, getRefresh }) => {

    const handleClick = (id: number) => {
        deleteTransfer(id)
            .then(() => getRefresh(true))
            .catch(err => console.error(err));
    }

    return (
        <table className="requests-table">
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>User</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {requests.map(r => (
                    <tr key={r.id}>
                        <td>{r.isbn}</td>
                        <td>{r.bookTitle}</td>
                        <td>{r.author}</td>
                        <td>{r.transferTo}</td>
                        {r.rejectedMessage === "" ? 
                        <div>
                        <td>Pending</td>
                        <td>
                        <button
                        onClick={() => handleClick(r.id)}
                        >Cancel</button>
                        </td>
                        </div>
                        :
                        <div>
                        <td className="transfer-status-col">Rejected <br/> Reason: {r.rejectedMessage}</td>
                            <td>
                        <button className="no-margin-button" onClick={() => handleClick(r.id)}>Close</button></td>  
                        </div> 
                    }
                    </tr>
                ))}
            </tbody>
        </table>
    )
};