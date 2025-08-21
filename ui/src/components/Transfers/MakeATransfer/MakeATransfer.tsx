import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchBar } from "../../SearchBar/SearchBar";
import { addTransfer, type Book, type TransferRequest } from "../../../api/ApiClient";
import { SelectBooks } from "../SelectBooks/SelectBooks";

type Props = {
    getRefresh: (boolean: boolean) => void;
}

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export const MakeATransfer: React.FC<Props> = ({ getRefresh }) => {
    const [status, setStatus] = useState<FormStatus>("READY");
    const [showForm, setShowForm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
        },
    });

    function submitForm(data: {
        username: string,
    }) {
        const request: TransferRequest = {
            username: data.username,
            ids: selectedBooks.map(book => book.id)
        };
        addTransfer(request)
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
                setSelectedBooks([]);
                setSearchTerm("");
                
                getRefresh(true);
            })
            .catch((err) => {
                console.error(err)
                setStatus("ERROR");
            })
    }

    return (
        <div className="new-transfer-container border-spaced-bottom">
            {!showForm && (
                <button
                    className="green-button no-margin-button"
                    onClick={() => setShowForm(true)}>
                    Make a transfer
                </button>
            )}
            {showForm && (
                <form onSubmit={handleSubmit(submitForm)}>
                    <span className="border-spaced-bottom">To transfer books to another user of the library, enter their username and search books from your catalogue to add to the request.</span>
                    <label htmlFor="username">
                        Username (case-sensitive)
                        <input
                            id="username"
                            type="text"
                            {...register("username", { required: { value: true, message: "This field is required" } })}
                        />
                    </label>
                    {errors.username && (<span className="error"> {errors.username.message}</span>)}
                    <SearchBar getSearchTerm={setSearchTerm} />
                    <SelectBooks searchTerm={searchTerm} getSelectedBooks={setSelectedBooks} />
                    <p className="search-heading">Books to be transferred</p>
                    <ul>
                        {selectedBooks.map(book =>
                            <li key={book.id}>{book.isbn}: {book.title}</li>
                        )}
                    </ul>
                    <button
                        className="green-button"
                        disabled={status === "SUBMITTING"}
                        type="submit">
                        Create transfer request
                    </button>

                    {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
                    {status === "FINISHED" && showMessage && <p className={`message ${fadeOut ? 'fade-out' : ''}`}>Transfer request has been sent.</p>}

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