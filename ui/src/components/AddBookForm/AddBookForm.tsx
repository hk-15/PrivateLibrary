import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBook, getAllCollections, type Collection } from "../../api/ApiClient";
import "./AddBookForm.scss";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export default function AddBookForm() {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [collections, setCollections] = useState<Collection[]>([]);
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const currentYear: number = new Date().getFullYear();

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm({
        defaultValues: {
            isbn: "978",
            title: "",
            author: "",
            translator: "",
            language: "",
            originalLanguage: "",
            collectionId: 0,
            publicationYear: currentYear,
            editionPublicationYear: currentYear,
            read: "false",
            notes: ""
        },
    });

    const formErrors = {
        isbn: {
        required: "ISBN is required",
        pattern: {
            value: /^[0-9]{13}$/,
            message: "ISBN must be 13 characters long",
        },
        },
    };

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response.sort())})
            .catch((err) => console.error(err));
    }, []);

    function submitForm(data: {
        isbn: string,
        title: string,
        author: string,
        translator?: string,
        language: string,
        originalLanguage?: string,
        collectionId: number,
        publicationYear: number,
        editionPublicationYear: number,
        read: string,
        notes?: string
    }) {
        const readBoolean = data.read === "true" ? true : false;
        const bookData = {
            ...data,
            read: readBoolean
        }
        setStatus("SUBMITTING");
        addBook(bookData)
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
        <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="isbn">
                ISBN<span className="required">*</span>
                <input
                id="isbn"
                type="number"
                {...register("isbn", formErrors.isbn)}
                />
                {errors.isbn && (<span className="error">{errors.isbn.message}</span>)}
            </label>

            <label htmlFor="title">
                Title<span className="required">*</span>
                <input
                id="title"
                type="text"
                {...register("title", {required: true})}
                />
            </label>

            <label htmlFor="author">
                Author<span className="required">*</span>
                <input
                id="author"
                type="text"
                {...register("author", {required: true})}
                />
            </label>

            <label htmlFor="collectionId">
                Collection<span className="required">*</span>
                <select
                    {...register("collectionId", {required: true, valueAsNumber: true})}>
                    <option value="">Select</option>
                    {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                        {collection.name}
                    </option>
                    ))}
                </select>
            </label>

            <label htmlFor="language">
                Language<span className="required">*</span>
                <input
                id="language"
                type="text"
                {...register("language", {required: true})}
                />
            </label>

            <label htmlFor="translator">
                Translator
                <input
                id="translator"
                type="text"
                {...register("translator")}
                />
            </label>

            <label htmlFor="originalLanguage">
                Original language
                <input
                id="originalLanguage"
                type="text"
                {...register("originalLanguage")}
                />
            </label>

            <label htmlFor="publicationYear">
                Year of publication<span className="required">*</span>
                <input
                id="publicationYear"
                type="number"
                {...register("publicationYear", {required: true, valueAsNumber: true})}
                />
            </label>

            <label htmlFor="editionPublicationYear">
                Year of edition publication<span className="required">*</span>
                <input
                id="editionPublicationYear"
                type="number"
                {...register("editionPublicationYear", {required: true, valueAsNumber: true})}
                />
            </label>

            <label htmlFor="read">
                Read?<span className="required">*</span>
                <input
                id="true"
                type="radio"
                value="true"
                {...register("read", {required: true})}
                />
                <label htmlFor="true">Yes</label>
                <input
                id="false"
                type="radio"
                value="false"
                {...register("read", {required: true})}
                />
                <label htmlFor="false">No</label>
            </label>

            <label htmlFor="notes">
                Notes
                <input
                id="notes"
                type="text"
                {...register("notes")}
                />
            </label>
            <button
                disabled={status === "SUBMITTING"}
                type="submit">
                Shelve book
            </button>
            {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
            {status === "FINISHED" && showMessage && <p className={`message ${fadeOut ? 'fade-out' : ''}`}>Catalogue has been updated.</p>}
        </form>
    )
}