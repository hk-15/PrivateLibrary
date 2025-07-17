type Props = {
  getSortBy: (term: string) => void;
};

export const CatalogueSort: React.FC<Props> = ({ getSortBy }) =>
{
    return (
        <label>
            Sort by
            <select onChange={e => getSortBy(e.target.value)}>
                <option value="Title">Title</option>
                <option value="Author">Author</option>
                <option value="Translator">Translator</option>
                <option value="Publication">Publication year</option>
            </select>
        </label>
    )
}