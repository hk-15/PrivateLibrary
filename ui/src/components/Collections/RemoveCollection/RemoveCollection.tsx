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
        formState: {errors},
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
        <div>
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}>
                    Remove Collection
                </button>
            )}
            {showForm && (
            <form onSubmit={handleSubmit(submitForm)}>
                <label htmlFor="collection">
                    Please enter collection name to confirm removal
                <input
                    id="collection"
                    type="text"
                    {...register("collection")}
                />
                {errors.collection && (<span className="error"> {errors.collection.message}</span>)}
                </label>
                <button
                    disabled={status === "SUBMITTING"}
                    type="submit">
                    Remove Collection
                </button>
                {status === "ERROR" && <p>{errMessage}</p>}
                {status === "FINISHED" && showMessage && <p className={`message ${fadeOut ? 'fade-out' : ''}`}>Collection has been removed.</p>}
                <button
                    type="button"
                    onClick={() => setShowForm(false)}>
                    Cancel
                </button>
            </form>
        )}
        </div>
    )
}