import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  recategoriseBooks,
  type Book,
  type Collection,
  type RecategoriseRequest,
} from "../../../api/ApiClient";

interface IProps {
  open?: boolean;
  header: string | React.ReactNode;
  books: Book[];
  collections: Collection[];
  getRefresh: (boolean: boolean) => void;
}

export const Collapsible: React.FC<IProps> = ({
  open,
  header,
  books,
  collections,
  getRefresh,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [selectBooks, setSelectBooks] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [collectionId, setCollectionId] = useState("");
  const [message, setMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    if (selectedBooks.length === 0 || collectionId === "") {
      setMessage("Please select books and a new collection to proceed");
      return;
    }
    const request: RecategoriseRequest = {
      ids: selectedBooks,
      collectionId: Number(collectionId),
    };
    recategoriseBooks(request)
      .then(() => {
        getRefresh(true);
        setMessage("Success!");
        setFadeOut(false);
        setTimeout(() => {
          setFadeOut(true);
        }, 3000);
        setTimeout(() => {
          setMessage("");
        }, 4000);
      })
      .catch((err) => setMessage(err));
  };

  return (
    <div className="collapsible-container">
      <div className="collapsible-header">
        <button className="collapsible-button" onClick={handleOpen}>
          <h2>{header}</h2>{" "}
          {!isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      </div>
      <div className="collapsible-body">
        {books.length === 0 && isOpen ? (
          <p>Nothing to see here...</p>
        ) : (
          isOpen && (
            <div className="table-container">
              <table className="border-spaced-bottom">
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Author</th>
                    <th>Translator</th>
                    <th>Publication Year</th>
                    <th className="select-col"></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b.id}>
                      <td>{b.isbn}</td>
                      <td>{b.title}</td>
                      <td>{b.subtitle}</td>
                      <td>
                        {b.authors.length > 1
                          ? `${b.authors.join(", ")}`
                          : b.authors}
                      </td>
                      <td>{b.translator}</td>
                      <td>{b.publicationYear}</td>
                      {selectBooks && (
                        <td>
                          <input
                            type="checkbox"
                            id={b.id.toString()}
                            name={b.id.toString()}
                            onChange={(e) => {
                              setSelectedBooks((prev) => {
                                if (e.target.checked) return [...prev, b.id];
                                else return prev.filter((id) => id !== b.id);
                              });
                            }}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!selectBooks ? (
                <div>
                  <button
                    className="no-margin-button"
                    onClick={() => setSelectBooks(true)}
                  >
                    Select books to recategorise
                  </button>
                </div>
              ) : (
                <div>
                  <label htmlFor="collectionId">
                    New collection
                    <select
                      id="collectionId"
                      onChange={(e) => setCollectionId(e.currentTarget.value)}
                    >
                      <option value="0">Select</option>
                      {collections
                        .filter((collection) => collection.name != header)
                        .map((collection) => (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        ))}
                    </select>
                  </label>
                  <div className="buttons-container">
                    <button onClick={handleSubmit}>
                      Recategorise selected books
                    </button>
                    <button
                      onClick={() => {
                        setSelectBooks(false);
                        setMessage("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  {message && (
                    <p className={`message ${fadeOut ? "fade-out" : ""}`}>
                      {message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
