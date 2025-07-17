import { useEffect, useState } from "react";
import { getBooks, type Book } from "../../api/ApiClient";

type Props = {
  getPage: (term: string) => void;
  currentPage: string,
  pageSize: string,
  searchTerm: string
};

export const ResultsPagination: React.FC<Props> = ({ getPage, currentPage, pageSize, searchTerm }) =>
{
    function prevPage(page: string) {
        let pageNum = +page;
        pageNum--;
        return pageNum.toString();
    }

    function nextPage(page: string) {
        let pageNum = +page;
        pageNum++;
        return pageNum.toString();
    }

    function checkMaxPage() {
        const [books, setBooks] = useState<Book[]>([]);
        useEffect(() => {
            getBooks(nextPage(currentPage), pageSize, "Title", searchTerm)
                .then(response => setBooks(response));
        }, []);
        return books.length === 0 ? true : false;
    }
    
    return (
        <div>
            <button
                onClick={() => getPage(prevPage(currentPage))}
                disabled={currentPage === "1"}
                >
                &lt;
            </button>
            {currentPage}
            <button
                onClick={() => getPage(nextPage(currentPage))}
                disabled={checkMaxPage()}
                > &gt; </button>
        </div>
    )
}