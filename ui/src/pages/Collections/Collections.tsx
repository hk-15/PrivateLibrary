import { useContext, useEffect, useState } from "react";
import { AddCollection } from "../../components/Collections/AddCollection/AddCollection";
import { LoginContext } from "../../components/LoginManager/LoginManager";
import { Page } from "../Page/Page";
import { CollectionsManagement } from "../../components/Collections/CollectionsManagement/CollectionsManagement";
import { getAllCollections, type Collection } from "../../api/ApiClient";
import { RemoveCollection } from "../../components/Collections/RemoveCollection/RemoveCollection";
import "./Collections.scss";
import LoginMessage from "../../components/LoginMessage/LoginMessage";

export default function Collections() {
    const loginContext = useContext(LoginContext);

    if (!loginContext.isLoggedIn) {
        return (
            <Page>
                <LoginMessage />
            </Page>
        )
    };

    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionNames, setCollectionNames] = useState<string[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response)
                setCollectionNames(response.map(response => response.name));
            })
            .catch((err) => console.error(err));
        setRefresh(false);
    }, [refresh]);


    return (
        <Page>
            <h1 className="border-spaced-bottom">Collections</h1>
            <div className="collection-options-container border-spaced-bottom">
                <AddCollection collections={collectionNames} getRefresh={setRefresh} />
                <RemoveCollection collections={collectionNames} getRefresh={setRefresh} />
            </div>
            <CollectionsManagement collections={collections} />
        </Page>
    )
}