import { useEffect, useState } from "react";
import { getBooks, type Book } from "../../../api/ApiClient";
import { UserBarCharts } from "../UserBarCharts/UserBarCharts";

type Props = {
    username: string;
}

export const UserStats: React.FC<Props> = ({ username }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks("", "", "", "")
            .then(response => setBooks(response))
            .catch(err => console.error(err));
    }, []);

    const numOfBooks = books.length;
    const readPercentage = Math.round(books.filter(b => b.read).length / numOfBooks * 100);
    const translatedPercentage = Math.round(books.filter(b => b.originalLanguage !== "" && b.originalLanguage !== null).length / numOfBooks * 100);

    const authorFrequency: Record<string, number> = {};
    books.flatMap(book => book.authors).forEach(author => {
        authorFrequency[author] = (authorFrequency[author] || 0) + 1;
    });
    const authorData = Object.entries(authorFrequency)
        .map(([author, count]) => ({ author, count, }))
        .sort((a, b) => b.count - a.count);

    return (
        <div className="border-spaced-bottom">
            <h2 className="border-spaced-bottom">{username}&#8217;s stats </h2>
            <div className="border-spaced-bottom">
                <ul className="stats-highlights">
                    <li><span className="stat-number">{numOfBooks}</span>books</li>
                    <li><span className="stat-number">&nbsp;{readPercentage}%</span>read</li>
                    <li><span className="stat-number">{authorData.length}</span>authors</li>
                    <li><span className="stat-number">{translatedPercentage}%</span>translated</li>
                </ul>
            </div>
            <div>
                <h3>Collections, languages and authors</h3>
                <UserBarCharts books={books} authorData={authorData} />
            </div>
        </div>
    )
}