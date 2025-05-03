type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
};

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return <div>
    <input type="text" />
  </div>;
};

export default SearchBar;
