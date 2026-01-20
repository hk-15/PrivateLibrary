import { Link } from "react-router-dom";

export default function AddBookButton() {
  return (
    <Link to="/add-book" className="button-link" id="add-book">
      Shelve a book
    </Link>
  );
}
