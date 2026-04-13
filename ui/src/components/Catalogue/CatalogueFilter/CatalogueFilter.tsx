type Props = {
  getFilter: (term: string) => void;
};

export const CatalogueFilter: React.FC<Props> = ({ getFilter }) => {
  return (
    <label>
      Filter
      <select onChange={(e) => getFilter(e.target.value)}>
        <option value="">None</option>
        <option value="true">Read</option>
        <option value="false">Unread</option>
      </select>
    </label>
  );
};
