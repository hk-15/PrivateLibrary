import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCollection, getAllCollections } from "../../api/ApiClient";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "DUPLICATE" | "FINISHED";

export default function AddCollection() {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [collections, setCollections] = useState<string[]>([]);
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

    const formErrors = {
        collection: {
            required: "This field is required"
        }
    };

    useEffect(() => {
            getAllCollections()
                .then((response) => {
                    setCollections(response.map(collection => collection.name))})
                .catch((err) => console.error(err));
        }, []);
    
    function submitForm(data: {
        collection: string
    }) {
        setStatus("SUBMITTING");
        if (collections.includes(data.collection)) {
            setStatus("DUPLICATE")
            return;
        }
        addCollection(data.collection)
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
                }, 4000);     
            })
            .catch(() => setStatus("ERROR"));
    }

    return (
        <div>
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}>
                    Add Collection
                </button>
            )}
            {showForm && (
            <form onSubmit={handleSubmit(submitForm)}>
                <label htmlFor="collection">
                    Collection name <span className="required">*</span>
                <input
                    id="collection"
                    type="text"
                    {...register("collection", formErrors.collection)}
                />
                {errors.collection && (<span className="error"> {errors.collection.message}</span>)}
                </label>
                <button
                    disabled={status === "SUBMITTING"}
                    type="submit">
                    Add Collection
                </button>
                {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
                {status === "DUPLICATE" && <p>That collection already exists.</p>}
                {status === "FINISHED" && showMessage && <p className={`message ${fadeOut ? 'fade-out' : ''}`}>Collection has been added.</p>}
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