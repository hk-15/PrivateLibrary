import { useState } from "react";
import { useForm } from "react-hook-form";
import { addCollection } from "../../../api/ApiClient";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "DUPLICATE" | "FINISHED";

interface IProps {
  collections: string[];
  getRefresh: (boolean: boolean) => void;
}

export const AddCollection: React.FC<IProps> = ({
  collections,
  getRefresh,
}) => {
  const [status, setStatus] = useState<FormStatus>("READY");
  const [showForm, setShowForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const collectionsLowerCase = collections.map((collection) =>
    collection.toLowerCase(),
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      collection: "",
    },
  });

  function submitForm(data: { collection: string }) {
    setStatus("SUBMITTING");
    if (collectionsLowerCase.includes(data.collection.toLowerCase())) {
      setStatus("DUPLICATE");
      reset();
      setFadeOut(false);
      setTimeout(() => {
        setFadeOut(true);
      }, 3000);
      setTimeout(() => {
        setStatus("READY");
      }, 4000);
      return;
    }
    addCollection(data.collection)
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
        getRefresh(true);
      })
      .catch((err) => {
        console.error(err);
        setStatus("ERROR");
        setFadeOut(false);
        setTimeout(() => {
          setFadeOut(true);
        }, 3000);
        setTimeout(() => {
          setStatus("READY");
        }, 4000);
      });
  }

  return (
    <div className="collection-form-container">
      {!showForm && (
        <button
          className="green-button no-margin-button"
          onClick={() => setShowForm(true)}
        >
          Add Collection
        </button>
      )}
      {showForm && (
        <form className="collection-form" onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="collection">
            Collection name
            <input
              id="collection"
              type="text"
              required
              {...register("collection")}
            />
          </label>
          {status === "ERROR" && (
            <p className={`message ${fadeOut ? "fade-out" : ""}`}>
              Something went wrong. Please try again.
            </p>
          )}
          {status === "DUPLICATE" && (
            <p className={`message ${fadeOut ? "fade-out" : ""}`}>
              That collection already exists.
            </p>
          )}
          {status === "FINISHED" && showMessage && (
            <p className={`message ${fadeOut ? "fade-out" : ""}`}>
              Collection has been added.
            </p>
          )}
          <div className="form-buttons-container">
            <button
              className="green-button"
              disabled={status === "SUBMITTING"}
              type="submit"
            >
              Add Collection
            </button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
