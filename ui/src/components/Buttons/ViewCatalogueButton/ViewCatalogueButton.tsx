import { Link } from "react-router-dom";

export default function ViewCatalogueButton() {
    return (
        <Link to="/catalogue" className="button-link">
            View my catalogue
        </Link>
    )
}