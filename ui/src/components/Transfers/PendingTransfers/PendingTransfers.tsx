import { useEffect, useState } from "react"
import { IncomingRequests } from "../IncomingRequests/IncomingRequests"
import { getTransfers, type Transfer } from "../../../api/ApiClient";
import { SentRequests } from "../SentRequests/SentRequests";
import { MakeATransfer } from "../MakeATransfer/MakeATransfer";

type Props = {
    currentUser: string;
}

export const PendingTransfers: React.FC<Props> = ({ currentUser }) => {
    const [incoming, setIncoming] = useState<Transfer[]>([]);
    const [sent, setSent] = useState<Transfer[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getTransfers()
            .then(response => {
                setIncoming(response.filter(t => t.transferTo === currentUser && t.rejectedMessage === ""));
                setSent(response.filter(t => t.transferFrom == currentUser));
                setRefresh(false);
            })
            .catch(err => console.error(err));
    }, [refresh]);

    return (
        <div>
            <MakeATransfer getRefresh={setRefresh} />
            {incoming.length > 0 &&
                <div>
                    <h2>Incoming transfer requests</h2>
                    <div className="border-spaced-bottom">
                        <IncomingRequests requests={incoming} getRefresh={setRefresh} />
                    </div>
                </div>
            }
            {sent.length > 0 &&
                <div className="border-spaced-bottom">
                    <h2>Sent transfer requests</h2>
                    <SentRequests requests={sent} getRefresh={setRefresh} />
                </div>
            }
        </div>
    )
}