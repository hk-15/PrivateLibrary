import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteCollection } from "../../../api/ApiClient";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

interface IProps {
    collections: string[],
    getRefresh: (boolean: boolean) => void
}

export const RemoveCollection: React.FC<IProps> = ({ collections, getRefresh }) => {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [errMessage, setErrMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            collection: ""
        },
    });

    function submitForm(data: {
        collection: string
    }) {
        setStatus("SUBMITTING");
        if (!collections.includes(data.collection)) {
            setStatus("ERROR");
            setErrMessage("No collection with that name exists")
            return;
        }
        deleteCollection(data.collection)
            .then(() => {
                setStatus("FINISHED")
                reset()
                setShowMessage(true)
                setFadeOut(false)
                setTimeout(() => {
                    setFadeOut(true);
                }, 3000);
                setTimeout(() => {
                    setShowMessage(false);
                }, 4000)
                getRefresh(true);
            })
            .catch((err) => {
                setStatus("ERROR")
                setErrMessage(err.message)
                reset();
            });

    }

    return (
        <div className="collection-form-container">
            {!showForm && (
                <button
                    className="red-button no-margin-button"
                    onClick={() => setShowForm(true)}>
                    Remove Collection
                </button>
            )}
            {showForm && (
                <form className="collection-form" onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor="collection">
                        Collection name
                        <input
                            id="collection"
                            type="text"
                            required
                            {...register("collection")}
                        />
                    </label>
                    {status === "ERROR" && <p>{errMessage}</p>}
                    {status === "FINISHED" && showMessage && <p className={`message ${fadeOut ? 'fade-out' : ''}`}>Collection has been removed.</p>}
                    <div className="form-buttons-container">
                        <button
                            className="red-button"
                            disabled={status === "SUBMITTING"}
                            type="submit">
                            Remove Collection
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setErrMessage("");
                            }}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}