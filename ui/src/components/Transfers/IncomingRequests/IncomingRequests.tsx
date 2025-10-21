import { useState } from "react";
import { type Transfer } from "../../../api/ApiClient";
import { TransfersPopUp } from "../TransfersPopUp/TransfersPopUp";

type Props = {
    requests: Transfer[];
    getRefresh: (boolean: boolean) => void;
}

type Actions = "accept" | "reject" | "";

export const IncomingRequests: React.FC<Props> = ({ requests, getRefresh }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [request, setRequest] = useState<{
        id: number,
        isbn: string,
        title: string,
        author: string[],
        user: string,
        action: Actions,
    }>({
        id: 0,
        isbn: "",
        title: "",
        author: [],
        user: "",
        action: "",
    });

    return (
        <div>
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
                                <button
                                    className="no-margin-button green-button"
                                    onClick={() => {
                                        setRequest(prev => ({
                                            ...prev,
                                            id: r.id,
                                            isbn: r.isbn,
                                            title: r.bookTitle,
                                            author: r.author,
                                            user: r.transferFrom,
                                            action: "accept"
                                        }))
                                        setShowPopUp(true)
                                    }}
                                >Accept</button>
                                <button
                                    className="no-margin-button red-button"
                                    onClick={() => {
                                        setRequest(prev => ({
                                            ...prev,
                                            id: r.id,
                                            isbn: r.isbn,
                                            title: r.bookTitle,
                                            author: r.author,
                                            user: r.transferFrom,
                                            action: "reject"
                                        }))
                                        setShowPopUp(true)
                                    }}
                                >Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopUp && <TransfersPopUp closePopUp={() => setShowPopUp(false)} request={request} getRefresh={getRefresh} />}
        </div>
    )
};