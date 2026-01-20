import { deleteTransfer, type Transfer } from "../../../api/ApiClient";

type Props = {
  requests: Transfer[];
  getRefresh: (boolean: boolean) => void;
};

export const SentRequests: React.FC<Props> = ({ requests, getRefresh }) => {
  const handleClick = (id: number) => {
    deleteTransfer(id)
      .then(() => getRefresh(true))
      .catch((err) => console.error(err));
  };

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
        {requests.map((r) => (
          <tr key={r.id}>
            <td>{r.isbn}</td>
            <td>{r.bookTitle}</td>
            <td>{r.author}</td>
            <td>{r.transferTo}</td>
            {r.rejectedMessage === "" ? (
              <td>Pending</td>
            ) : (
              <td className="transfer-status-col rejected-status">
                Rejected: <br /> {r.rejectedMessage}
              </td>
            )}
            <td>
              <button onClick={() => handleClick(r.id)}>
                {r.rejectedMessage === "" ? "Cancel" : "Close"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
