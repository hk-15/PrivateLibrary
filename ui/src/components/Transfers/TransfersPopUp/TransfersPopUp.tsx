import { useEffect, useState } from "react";
import { getAllCollections, handleTransfer } from "../../../api/ApiClient";
import { SearchableDropdown } from "../../SearchableDropdown/SearchableDropdown";
import { closePopUps } from "../../ClosePopUps/ClosePopUps";

type Actions = "accept" | "reject" | "";

type Props = {
  closePopUp: () => void;
  request: {
    id: number;
    isbn: string;
    title: string;
    author: string[];
    user: string;
    action: Actions;
  };
  getRefresh: (boolean: boolean) => void;
};

export const TransfersPopUp: React.FC<Props> = ({
  closePopUp,
  request,
  getRefresh,
}) => {
  const [collections, setCollections] = useState<string[]>();
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [rejectedMessage, setRejectedMessage] = useState("");
  const [err, setErr] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  const ref = closePopUps(() => {
    closePopUp();
  });

  useEffect(() => {
    getAllCollections()
      .then((response) => setCollections(response.map((c) => c.name)))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = () => {
    if (request.action === "reject") {
      if (rejectedMessage === "") {
        setErr("This field is required");
        setFadeOut(false);
        setTimeout(() => {
          setFadeOut(true);
        }, 2000);
        setTimeout(() => {
          setErr("");
        }, 3000);
        return;
      }
      handleTransfer(request.id, request.action, rejectedMessage)
        .then(() => {
          setErr("");
          getRefresh(true);
        })
        .catch((err) => console.error(err));
      closePopUp();
      return;
    }
    if (selectedCollection === "") {
      setErr("Please select a collection");
      setFadeOut(false);
      setTimeout(() => {
        setFadeOut(true);
      }, 2000);
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }
    handleTransfer(request.id, request.action, selectedCollection)
      .then(() => {
        setSelectedCollection("");
        setErr("");
        getRefresh(true);
      })
      .catch((err) => console.error(err));
    closePopUp();
  };

  return (
    <div className="transfers-pop-up pop-up" ref={ref}>
      <button className="close-button" onClick={closePopUp}>
        x
      </button>
      {request.action === "accept" ? (
        <div className="transfers-pop-up-body">
          <table className="requests-table">
            <tbody>
              <tr>
                <td>ISBN</td>
                <td>{request.isbn}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{request.title}</td>
              </tr>
              <tr>
                <td>Author(s)</td>
                <td>{request.author}</td>
              </tr>
              <tr>
                <td>User</td>
                <td>{request.user}</td>
              </tr>
            </tbody>
          </table>
          <div className="searchable-dropdown">
            <SearchableDropdown
              dropdownItems={collections}
              placeholderText="Select a collection..."
              getSelected={setSelectedCollection}
            />
            {err && (
              <p className={`error-message ${fadeOut ? "fade-out" : ""}`}>
                {err}
              </p>
            )}
          </div>

          <button className="green-button" onClick={handleSave}>
            Add to catalogue
          </button>
          <button
            onClick={() => {
              closePopUp();
              setSelectedCollection("");
              setErr("");
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="transfers-pop-up-body">
          <label htmlFor="message">
            Please provide a reason:
            <input
              type="text"
              id="message"
              name="message"
              onChange={(e) => setRejectedMessage(e.target.value)}
            />
          </label>
          {err && <p>{err}</p>}
          <button className="red-button" onClick={handleSave}>
            Reject request
          </button>
          <button
            onClick={() => {
              closePopUp();
              setRejectedMessage("");
              setErr("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
