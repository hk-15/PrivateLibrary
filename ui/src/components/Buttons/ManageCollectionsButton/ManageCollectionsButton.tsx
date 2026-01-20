import { Link } from "react-router-dom";

export default function ManageCollectionsButton() {
  return (
    <Link to="/collections" className="button-link">
      Manage collections
    </Link>
  );
}
