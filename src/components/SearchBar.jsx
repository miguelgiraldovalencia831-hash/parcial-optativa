function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <span className="search__icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        placeholder="Filtrar resultados por título o descripción..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default SearchBar;
