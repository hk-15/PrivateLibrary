import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addBook,
  getAllCollections,
  type Collection,
  type FormStatus,
} from "../../api/ApiClient";

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
    mode: "onChange",
    defaultValues: {
      isbn: "978",
      title: "",
      subtitle: "",
      authors: "",
      translator: "",
      language: "",
      originalLanguage: "",
      collectionId: 0,
      publicationYear: currentYear,
      read: "false",
      notes: "",
      tags: "",
    },
  });

  useEffect(() => {
    getAllCollections()
      .then((response) => {
        setCollections(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => console.error(err));
  }, []);

  function createList(input: string) {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  function submitForm(data: {
    isbn: string;
    title: string;
    subtitle?: string;
    authors: string;
    translator?: string;
    language: string;
    originalLanguage?: string;
    collectionId: number;
    publicationYear: number;
    read: string;
    notes?: string;
    tags: string;
  }) {
    const readBoolean = data.read === "true" ? true : false;
    const bookData = {
      ...data,
      authors: createList(data.authors),
      tags: createList(data.tags),
      read: readBoolean,
    };
    setStatus("SUBMITTING");
    addBook(bookData)
      .then(() => {
        setStatus("FINISHED");
        reset();
        setShowMessage(true);
        setFadeOut(false);
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
    <div className="border-spaced-bottom">
      <form className="add-book-form" onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="isbn">
          ISBN *
          <input
            id="isbn"
            type="text"
            {...register("isbn", {
              required: true,
              pattern: {
                value: /^[0-9]{10,13}$/,
                message:
                  "ISBN must be between 10 and 13 characters long and contain only numbers",
              },
            })}
          />
        </label>
        {errors.isbn && <span className="error">{errors.isbn.message}</span>}

        <label htmlFor="title">
          Title *
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
          />
        </label>

        <label htmlFor="subtitle">
          Subtitle
          <input id="subtitle" type="text" {...register("subtitle")} />
        </label>

        <label htmlFor="author">
          Author(s) *
          <input
            id="author"
            type="text"
            {...register("authors", { required: true })}
          />
        </label>

        <label htmlFor="collectionId">
          Collection *
          <select
            id="collectionId"
            {...register("collectionId", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="">Select</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="publicationYear">
          Year of publication *
          <input
            id="publicationYear"
            type="number"
            {...register("publicationYear", {
              required: true,
              valueAsNumber: true,
              max: {
                value: currentYear + 1,
                message: "Please enter a valid year",
              },
              min: { value: 1900, message: "Please enter a valid year" },
            })}
          />
        </label>
        {errors.publicationYear && (
          <span className="error">{errors.publicationYear.message}</span>
        )}

        <label htmlFor="language">
          Language *
          <input
            id="language"
            type="text"
            {...register("language", { required: true })}
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

        <label htmlFor="translator">
          Translator
          <input id="translator" type="text" {...register("translator")} />
        </label>

        <label htmlFor="notes">
          Notes
          <textarea id="notes" {...register("notes")}></textarea>
        </label>

        <label htmlFor="tags">
          Tags
          <input id="tags" type="text" {...register("tags")} />
        </label>

        <label>
          Read? *
          <span className="radio-options">
            <label htmlFor="true" className="read-label">
              <input
                id="true"
                type="radio"
                value="true"
                {...register("read", { required: true })}
              />
              Yes
            </label>
            <label htmlFor="false" className="read-label">
              <input
                id="false"
                type="radio"
                value="false"
                {...register("read", { required: true })}
              />
              No
            </label>
          </span>
        </label>

        <button
          className="add-book-button"
          disabled={status === "SUBMITTING"}
          type="submit"
        >
          Shelve book
        </button>
        {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
        {status === "FINISHED" && showMessage && (
          <p className={`message ${fadeOut ? "fade-out" : ""}`}>
            Catalogue has been updated.
          </p>
        )}
      </form>
    </div>
  );
}
