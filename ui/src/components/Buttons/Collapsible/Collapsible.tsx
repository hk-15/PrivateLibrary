import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Collapsible.scss";
import type { Book } from "../../../api/ApiClient";

interface IProps {
    open?: boolean;
    header: string | React.ReactNode;
    books: Book[];
}

export const Collapsible: React.FC<IProps> = ({ open, header, books }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="collapsible-container">
            <div className="collapsible-header">
                <button
                    onClick={handleOpen}
                ><h2>{header}</h2> {!isOpen ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                    <FontAwesomeIcon icon={faChevronUp} />
                )}
                </button>
            </div>
            <div className="collapsible-body">
                {books.length === 0 && isOpen ? <p>Nothing to see here...</p> :

                    <div>{isOpen &&
                        <table>
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Title</th>
                                    <th>Subtitle</th>
                                    <th>Author</th>
                                    <th>Translator</th>
                                    <th>Publication Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map(b =>
                                        <tr key={b.id}>
                                            <td>{b.isbn}</td>
                                            <td>{b.title}</td>
                                            <td>{b.subtitle}</td>
                                            <td>{b.authors.length > 1 ? `${b.authors.join(', ')}` : b.authors}</td>
                                            <td>{b.translator}</td>
                                            <td>{b.publicationYear}</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    }</div>}
            </div>
        </div>
    )
}