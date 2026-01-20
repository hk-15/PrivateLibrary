import { useState } from "react";
import {
  updateBookDetails,
  type Book,
  type BookRequest,
  type Collection,
} from "../../../api/ApiClient";
import { useForm } from "react-hook-form";

type Props = {
  book: Book;
  getSaveStatus: (status: boolean) => void;
  getEditedBook: (book: Book) => void;
  getEditStatus: (status: boolean) => void;
  collections: Collection[];
};

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export const EditDetails: React.FC<Props> = ({
  book,
  getSaveStatus,
  getEditedBook,
  getEditStatus,
  collections,
}) => {
  const [status, setStatus] = useState<FormStatus>("READY");
  const currentYear: number = new Date().getFullYear();

  function createList(input: string) {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ...book,
      read: book.read === true ? "true" : "false",
      authors: book.authors.join(", "),
      tags: book.tags.join(", "),
    },
  });

  function submitForm(data: {
    isbn: string;
    title: string;
    subtitle?: string;
    authors: string;
    translator?: string;
    language: string;
    originalLanguage?: string;
    collection: string;
    publicationYear: number;
    read: string;
    notes?: string;
    tags: string;
  }) {
    const readBoolean = data.read === "true" ? true : false;
    const bookData: BookRequest = {
      isbn: data.isbn,
      title: data.title,
      subtitle: data.subtitle ?? "",
      authors: createList(data.authors),
      translator: data.translator ?? "",
      language: data.language,
      originalLanguage: data.originalLanguage ?? "",
      collectionId:
        collections.find((c) => c.name === data.collection)?.id ?? 0,
      read: readBoolean,
      publicationYear: data.publicationYear,
      notes: data.notes ?? "",
      tags: createList(data.tags),
    };
    setStatus("SUBMITTING");
    updateBookDetails(book.id, bookData)
      .then(() => {
        setStatus("FINISHED");
        getEditedBook({
          ...bookData,
          id: book.id,
          owner: book.owner,
          collection: book.collection,
        });
        getSaveStatus(true);
      })
      .catch((err) => {
        console.error(err);
        setStatus("ERROR");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <table>
          <thead>
            <tr>
              <th className="first-col">Edit details</th>
            </tr>
          </thead>
          <tbody>
            <tr key={book.id}>
              <td className="first-col">ISBN *</td>
              <td className="input-td">
                <input
                  key={book.id}
                  id="isbn"
                  className="isbn"
                  type="text"
                  required
                  {...register("isbn", {
                    required: true,
                    pattern: {
                      value: /^[0-9]{10,13}$/,
                      message:
                        "ISBN must be between 10 and 13 characters long and contain only numbers",
                    },
                  })}
                />
                {errors.isbn && (
                  <span className="update-details-error">
                    {errors.isbn.message}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="first-col">Title *</td>
              <td className="input-td">
                <input
                  key={book.id}
                  id="title"
                  type="text"
                  required
                  {...register("title", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td className="first-col">Subtitle</td>
              <td className="input-td">
                <input
                  key={book.id}
                  id="subtitle"
                  type="text"
                  {...register("subtitle")}
                />
              </td>
            </tr>
            <tr>
              <td className="first-col">Author(s) *</td>
              <td className="input-td">
                <input
                  key={book.id}
                  id="authors"
                  type="text"
                  required
                  {...register("authors", { required: true })}
                />
                <span className="input-tip">
                  Tip: Separate authors with a comma
                </span>
              </td>
            </tr>
            <tr>
              <td className="first-col">Publication Year *</td>
              <td className="input-td">
                <input
                  key={book.id}
                  id="publicationYear"
                  type="number"
                  className="publication-year"
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
                {errors.publicationYear && (
                  <span className="error">
                    {errors.publicationYear.message}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="first-col">Language *</td>
              <td className="input-td">
                <input
                  key={book.id}
                  type="text"
                  required
                  id="language"
                  {...register("language", { required: true })}
                />
              </td>
            </tr>
            <tr>
              <td className="first-col">Original Language</td>
              <td className="input-td">
                <input
                  key={book.id}
                  type="text"
                  id="originalLanguage"
                  {...register("originalLanguage")}
                />
              </td>
            </tr>
            <tr>
              <td className="first-col">Translator</td>
              <td className="input-td">
                <input
                  key={book.id}
                  type="text"
                  id="translator"
                  {...register("translator")}
                />
              </td>
            </tr>
            <tr>
              <td className="first-col">Collection</td>
              <td>
                <select
                  required
                  key={book.id}
                  id="collection"
                  {...register("collection", { required: true })}
                >
                  {[...collections]
                    .sort((a, b) =>
                      a.name === book.collection
                        ? -1
                        : b.name === book.collection
                          ? 1
                          : 0,
                    )
                    .map((collection) => (
                      <option key={collection.id} value={collection.name}>
                        {collection.name}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="first-col">Notes</td>
              <td className="input-td">
                <textarea
                  key={book.id}
                  id="notes"
                  {...register("notes")}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="first-col">Tags</td>
              <td className="input-td">
                <input
                  key={book.id}
                  type="text"
                  id="tags"
                  {...register("tags")}
                />
                <span className="input-tip">
                  Tip: Separate tags with a comma
                </span>
              </td>
            </tr>
            <tr>
              <td className="first-col">Read? *</td>
              <td className="input-td-read">
                <label htmlFor="true">
                  Yes
                  <input
                    id="true"
                    type="radio"
                    value="true"
                    required
                    className="read-radio"
                    {...register("read", { required: true })}
                  />
                </label>
                <label htmlFor="false">
                  No
                  <input
                    id="false"
                    type="radio"
                    value="false"
                    className="read-radio"
                    {...register("read", { required: false })}
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className="green-button"
            type="submit"
            disabled={status === "SUBMITTING"}
          >
            Save
          </button>
          <button
            onClick={() => {
              getEditStatus(false);
            }}
          >
            Cancel
          </button>
        </div>
        {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
};
