import { useEffect, useState } from "react";
import {
  deleteCollection,
  getBooks,
  type Book,
  type Collection,
} from "../../../api/ApiClient";

type Props = {
  collections: Collection[];
  getRefresh: (boolean: boolean) => void;
};

export const CollectionsManagement: React.FC<Props> = ({
  collections,
  getRefresh,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [fetchBooks, setFetchBooks] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState({
    id: 0,
    name: "",
  });
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  useEffect(() => {
    getBooks("", "", "", "")
      .then((response) => setBooks(response))
      .catch((err) => console.error(err));
    setFetchBooks(false);
  }, [fetchBooks]);

  useEffect(() => {
    setSortedCollections(
      collections.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
      ),
    );
  }, [collections]);

  useEffect(() => {
    if (selectedCollection.name !== "") {
      const performDelete = async () => {
        try {
          await deleteCollection(selectedCollection.name);
        } catch (err) {
          console.error(err);
        }
      };
      performDelete();
      setSelectedCollection({ id: 0, name: "" });
      getRefresh(true);
    }
  }, [selectedCollection.name]);

  return (
    <div className="border-spaced-bottom">
      <table className="collections-table">
        <thead>
          <tr>
            <th>Collection</th>
            <th>Collection size</th>
            <th>Percentage read</th>
          </tr>
        </thead>
        <tbody>
          {sortedCollections.map((collection) => {
            const booksInCollection = books.filter(
              (b) => b.collection === collection.name,
            );
            const bookCount = booksInCollection.length;
            const percentageRead = Math.round(
              (booksInCollection.filter((b) => b.read === true).length /
                bookCount) *
                100,
            );
            return (
              <tr key={collection.id}>
                <td>{collection.name}</td>
                <td>{bookCount} books</td>
                <td>{bookCount !== 0 && `${percentageRead}%`}</td>
                {bookCount === 0 && selectedCollection.id === 0 && (
                  <td className="delete-column">
                    <button
                      className="red-button no-margin-button"
                      onClick={() =>
                        setSelectedCollection((prev) => ({
                          ...prev,
                          id: collection.id,
                        }))
                      }
                    >
                      Remove
                    </button>
                  </td>
                )}
                {selectedCollection.id === collection.id && (
                  <td className="delete-column">
                    {" "}
                    <p>Are you sure?</p>
                    <button
                      className="red-button no-margin-button"
                      onClick={() =>
                        setSelectedCollection((prev) => ({
                          ...prev,
                          name: collection.name,
                        }))
                      }
                    >
                      Remove
                    </button>
                    <button
                      className="no-margin-button"
                      onClick={() => setSelectedCollection({ id: 0, name: "" })}
                    >
                      Cancel
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
