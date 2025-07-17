type Props = {
  getSearchTerm: (term: string) => void;
};

export const SearchBar: React.FC<Props> = ({ getSearchTerm }) =>
{
    return (
        <label htmlFor="searchBar">
            <input
            id="searchBar"
            type="text"
            onChange={e => getSearchTerm(e.target.value)}
            />
        </label>
    )
}