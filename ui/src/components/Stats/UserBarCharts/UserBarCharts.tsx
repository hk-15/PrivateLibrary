import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Book } from "../../../api/ApiClient";

type Props = {
    books: Book[];
    authorData: {
        author: string;
        count: number;
    }[];
}

export const UserBarCharts: React.FC<Props> = ({ books, authorData }) => {

    const collectionCounts = books.reduce<Record<string, number>>((acc, book) => {
        acc[book.collection] = (acc[book.collection] || 0) + 1;
        return acc;
    }, {});

    const collectionsData = Object.entries(collectionCounts)
        .map(([name, count]) => ({ name, count, }))
        .sort((a, b) => b.count - a.count);

    const langCounts = books.filter(b => b.originalLanguage !== null && b.originalLanguage !== "").reduce<Record<string, number>>((acc, book) => {
        acc[book.originalLanguage!] = (acc[book.originalLanguage!] || 0) + 1;
        return acc;
    }, {});

    const langData = Object.entries(langCounts)
        .map(([lang, count]) => ({ lang, count, }))
        .sort((a, b) => b.count - a.count);

    return (
        <div className="bar-charts-container">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart width={500} height={300} data={collectionsData.slice(0, 5)} layout="vertical" margin={{ left: 45, right: 2 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2079DF" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart width={500} height={300} data={langData.slice(0, 5)} layout="vertical" margin={{ left: 45, right: 2 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="lang" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#DF2079" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart width={500} height={500} data={authorData.slice(0, 5)} layout="vertical" margin={{ left: 45, right: 2 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="author" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#79DF20" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}