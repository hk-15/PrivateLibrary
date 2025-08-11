import { useEffect, useState } from "react";
import { getBooks, type Book } from "../../api/ApiClient";
import { BarCharts } from "./BarCharts/BarCharts";

type Props = {
    username: string;
}

export const Stats: React.FC<Props> = ({ username }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks("", "", "", "")
            .then(response => setBooks(response))
            .catch(err => console.error(err));
    }, []);

    const numOfBooks = books.length;
    const readPercentage = Math.round(books.filter(b => b.read).length / numOfBooks * 100);
    const translatedPercentage = Math.round(books.filter(b => b.originalLanguage !== "" && b.originalLanguage !== null).length / numOfBooks * 100);


    return (
        <div>
            <h2>{username}&#8217;s stats </h2>
            <div>
                <ul>
                    <li>{numOfBooks} books</li>
                    <li>{readPercentage}% read</li>
                    <li>{translatedPercentage}% translated</li>
                </ul>
            </div>
            <div>
                <h3>Collections</h3>
                <BarCharts books={books} />
            </div>
            <div>

            </div>
        </div>
    )
}