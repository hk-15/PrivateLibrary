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
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>User</th>
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
                            <button
                                onClick={() =>
                                    setHandleRequest(prev => ({
                                        ...prev,
                                        id: r.id,
                                        action: "accept"
                                    }))}
                            >Accept</button>
                            {handleRequest.id === r.id && handleRequest.action === "accept" &&
                                <span>Are you sure?
                                    <button
                                        onClick={handleSave}
                                    >
                                        Add {r.bookTitle} to catalogue
                                    </button>
                                    <button
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

                            <button
                                onClick={() => setHandleRequest(prev => ({
                                    ...prev,
                                    id: r.id,
                                    action: "reject"
                                }))}
                            >Reject</button>
                            {handleRequest.id === r.id && handleRequest.action === "reject" &&
                                <span>Are you sure?
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
                                        onClick={handleSave}
                                    >
                                        Reject request
                                    </button>
                                    <button
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
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};