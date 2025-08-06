import { useContext, useEffect, useState } from "react";
import { AddCollection } from "../../components/Collections/AddCollection/AddCollection";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import { CollectionsManagement } from "../../components/Collections/CollectionsManagement/CollectionsManagement";
import { getAllCollections } from "../../api/ApiClient";
import { RemoveCollection } from "../../components/Collections/RemoveCollection/RemoveCollection";

export default function Collections() {
    const loginContext = useContext(LoginContext);
    
    if (!loginContext.isLoggedIn) {
        return (
            <p>Please <a href="/login">log in</a></p>
        )
    };

    const [collections, setCollections] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response.map(collection => collection.name))
            })
            .catch((err) => console.error(err));
        setRefresh(false);
    }, [refresh]);
        

    return (
        <Page>
            <h1>Collections</h1>
            <AddCollection collections={collections} getRefresh={setRefresh} />
            <RemoveCollection collections={collections} getRefresh={setRefresh} />
            <CollectionsManagement collections={collections} />
        </Page>
    )
}