import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import type { Book } from "../../../api/ApiClient";

type Props = {
    books: Book[];
}

export const BarCharts: React.FC<Props> = ({ books }) => {

    const collectionCounts = books.reduce<Record<string, number>>((acc, book) => {
        acc[book.collection] = (acc[book.collection] || 0) + 1;
        return acc;
    }, {});

    const collectionsData = Object.entries(collectionCounts).map(([name, count]) => ({
        name,
        count,
    }));

    return (
        <BarChart width={300} height={300} data={collectionsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    )
}