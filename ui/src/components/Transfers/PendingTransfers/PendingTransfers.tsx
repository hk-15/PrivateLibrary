import { useEffect, useState } from "react"
import { IncomingRequests } from "../IncomingRequests/IncomingRequests"
import { getTransfers, type Transfer } from "../../../api/ApiClient";
import { SentRequests } from "../SentRequests/SentRequests";
import { MakeATransfer } from "../MakeATransfer/MakeATransfer";

type Props = {
    currentUser: string;
}

export const PendingTransfers: React.FC<Props> = ({ currentUser }) => {
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getTransfers()
            .then(response => {
                setTransfers(response);
                setRefresh(false);
            })
            .catch(err => console.error(err));
    }, [refresh]);

    return (
        <div>
            <MakeATransfer getRefresh={setRefresh}/>
            <h2>Incoming transfer requests</h2>
            <IncomingRequests requests={transfers.filter(t => t.transferTo === currentUser && t.rejectedMessage === "")} getRefresh={setRefresh} />
            <h2>Sent transfer requests</h2>
            <SentRequests requests={transfers.filter(t => t.transferFrom == currentUser)} getRefresh={setRefresh} />
        </div>
    )
}