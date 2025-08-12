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
        <div>
            <h2>{username}&#8217;s stats </h2>
            <div>
                <ul>
                    <li>{numOfBooks} books</li>
                    <li>{readPercentage}% read</li>
                    <li>{authorData.length} authors</li>
                    <li>{translatedPercentage}% translated</li>
                </ul>
            </div>
            <div>
                <h3>Collections, languages and authors</h3>
                <UserBarCharts books={books} authorData={authorData} />
            </div>
        </div>
    )
}