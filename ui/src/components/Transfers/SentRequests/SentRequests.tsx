import type { Transfer } from "../../../api/ApiClient";

type Props = {
    requests: Transfer[];
}

export const SentRequests: React.FC<Props> = ({ requests }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>User</th>
                    <th>Status</th>
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
                        <span>
                        <td>Pending</td>
                        <td><button>Cancel</button></td>
                        </span>
                        :
                        <span>
                        <td>Rejected <br/> Reason: {r.rejectedMessage}</td>
                        <td><button>Reshelve</button></td>   
                        </span>
                    }
                    </tr>
                ))}
            </tbody>
        </table>
    )
};