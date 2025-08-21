import { useState } from "react";
import { handleTransfer, type Transfer } from "../../../api/ApiClient";

type Props = {
    requests: Transfer[];
    getRefresh: (boolean: boolean) => void;
}

type Actions = "accept" | "reject" | "";

export const IncomingRequests: React.FC<Props> = ({ requests, getRefresh }) => {
    const [handleRequest, setHandleRequest] = useState<{
        id: number,
        action: Actions,
        message: string,
    }>({
        id: 0,
        action: "",
        message: "",
    });
    const [err, setErr] = useState("");

    const handleSave = () => {
        if (handleRequest.action === "reject" && handleRequest.message === "") {
            setErr("This field is required")
            return;
        }
        handleTransfer(handleRequest.id, handleRequest.action, handleRequest.message)
            .then(() => {
                setErr("");
                setHandleRequest({
                    id: 0,
                    action: "",
                    message: "",
                });
                getRefresh(true);
            })
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
                    <th className="actions"></th>
                </tr>
            </thead>
            <tbody>
                {requests.map(r => (
                    <tr key={r.id}>
                        <td>{r.isbn}</td>
                        <td>{r.bookTitle}</td>
                        <td>{r.author}</td>
                        <td>{r.transferFrom}</td>
                        <td>
                            {handleRequest.id === 0 &&
                                <div>
                                    <button
                                        className="no-margin-button green-button"
                                        onClick={() =>
                                            setHandleRequest(prev => ({
                                                ...prev,
                                                id: r.id,
                                                action: "accept"
                                            }))}
                                    >Accept</button>
                                    <button
                                        className="no-margin-button red-button"
                                        onClick={() => setHandleRequest(prev => ({
                                            ...prev,
                                            id: r.id,
                                            action: "reject"
                                        }))}
                                    >Reject</button>
                                </div>
                            }
                            {handleRequest.id === r.id && handleRequest.action === "accept" &&
                                <span className="action-check">Are you sure?
                                    <button
                                        className="no-margin-button green-button"
                                        onClick={handleSave}
                                    >
                                        Add to catalogue
                                    </button>
                                    <button
                                        className="no-margin-button"
                                        onClick={() => setHandleRequest(prev => ({
                                            ...prev,
                                            id: 0,
                                            action: ""
                                        }))}
                                    >
                                        Cancel
                                    </button>
                                </span>
                            }
                            {handleRequest.id === r.id && handleRequest.action === "reject" &&
                                <span className="action-check">
                                    <label
                                        htmlFor="message"
                                    >Please provide a reason:
                                        <input
                                            type="text"
                                            id="message"
                                            name="message"
                                            onChange={(e) => setHandleRequest(prev => ({
                                                ...prev,
                                                message: e.target.value
                                            }))}
                                        />
                                    </label>
                                    {err && <p>{err}</p>}
                                    <button
                                        className="red-button"
                                        onClick={handleSave}
                                    >
                                        Reject request
                                    </button>
                                    <button
                                        onClick={() => {
                                            setHandleRequest(prev => ({
                                            ...prev,
                                            id: 0,
                                            action: ""
                                            }))
                                            setErr("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </span>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};