import "./SearchBar.scss";

type Props = {
  getSearchTerm: (term: string) => void;
};

export const SearchBar: React.FC<Props> = ({ getSearchTerm }) =>
{
    return (
        <label className="search-label" htmlFor="searchBar">
            Search
            <input
            id="searchBar"
            className="search-bar"
            type="text"
            onChange={e => getSearchTerm(e.target.value)}
            />
        </label>
    )
}