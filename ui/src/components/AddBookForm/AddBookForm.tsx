import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBook, getAllCollections, type Collection } from "../../api/ApiClient";
import "./AddBookForm.scss";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export default function AddBookForm() {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [collections, setCollections] = useState<Collection[]>([]);
    const currentYear: number = new Date().getFullYear();

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
        defaultValues: {
            id: "",
            title: "",
            author: "",
            translator: "",
            language: "",
            originalLanguage: "",
            collection: "",
            publicationYear: currentYear,
            editionPublicationYear: currentYear,
            read: false,
            notes: ""
        },
    });

    const formErrors = {
        id: {
        required: "ISBN is required",
        pattern: {
            value: /^[0-9]{13}$/,
            message: "ISBN must be 13 characters long",
        },
        },
        title: {
        required: "Title is required",
        },
        author: {
        required: "Author is required",
        },
        language: {
        required: "Language is required",
        },
        collection: {
        required: "Collection is required",
        },
    };

    useEffect(() => {
        getAllCollections()
            .then((response) => {
                setCollections(response.sort())})
            .catch((err) => console.error(err));
    }, []);

    function submitForm(data: {
        id: string,
        title: string,
        author: string,
        translator?: string,
        language: string,
        originalLanguage?: string,
        collection: string,
        publicationYear: number,
        editionPublicationYear: number,
        read: boolean,
        notes?: string
    }) {
        const bookData = {
        ...data,
        };
        addBook(bookData)
            .then(() => setStatus("FINISHED"))
            .catch(() => setStatus("ERROR"));
    }

    // if (status === "FINISHED") {
    //     return (
    //         //empty form and display success message that fades
    //     );
    // }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="id">
                ISBN <span className="required">*</span>
                <input
                id="id"
                type="number"
                {...register("id", formErrors.id)}
                />
                {errors.id && (<span className="error">{errors.id.message}</span>)}
            </label>

            <label htmlFor="title">
                Title <span className="required">*</span>
                <input
                id="title"
                type="text"
                {...register("title", formErrors.title)}
                />
                {errors.title && (<span className="error">{errors.title.message}</span>)}
            </label>

            <label htmlFor="author">
                Author <span className="required">*</span>
                <input
                id="author"
                type="text"
                {...register("author", formErrors.author)}
                />
                {errors.author && (<span className="error">{errors.author.message}</span>)}
            </label>

            <label htmlFor="collection">
                Collection <span className="required">*</span>
                <select
                    {...register("collection", formErrors.collection)}>
                    <option value="">Select</option>
                    {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                        {collection.name}
                    </option>
                    ))}
                </select>
                {errors.collection && (<span className="error">{errors.collection.message}</span>)}
            </label>

            <label htmlFor="language">
                Language <span className="required">*</span>
                <input
                id="language"
                type="text"
                {...register("language", formErrors.language)}
                />
                {errors.language && (<span className="error">{errors.language.message}</span>)}
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
                Year of publication <span className="required">*</span>
                <input
                id="publicationYear"
                type="number"
                {...register("publicationYear")}
                />
            </label>

            <label htmlFor="editionPublicationYear">
                Year of edition publication <span className="required">*</span>
                <input
                id="editionPublicationYear"
                type="number"
                {...register("editionPublicationYear")}
                />
            </label>

            <label htmlFor="read">
                Read? <span className="required">*</span>
                <input
                id="true"
                type="radio"
                value="true"
                {...register("read")}
                />
                <label htmlFor="true">Yes</label>
                <input
                id="false"
                type="radio"
                value="false"
                {...register("read")}
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
                Add book
            </button>
            {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
        </form>
    )
}