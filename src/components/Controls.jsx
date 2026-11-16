import SearchBar from "./SearchBar";

const TOPICS = [
  { value: "nebula", label: "Nebulosas" },
  { value: "galaxy", label: "Galaxias" },
  { value: "mars", label: "Marte" },
  { value: "moon", label: "La Luna" },
  { value: "jupiter", label: "Júpiter" },
  { value: "saturn", label: "Saturno" },
  { value: "apollo", label: "Misiones Apolo" },
  { value: "hubble", label: "Telescopio Hubble" },
];

function Controls({
  topic,
  onTopicChange,
  page,
  onPageChange,
  search,
  onSearchChange,
  sortOrder,
  onSortChange,
  onClear,
  hasFilters,
  loading,
  total,
  shown,
}) {
  return (
    <section className="controls" aria-label="Controles de búsqueda">
      <div className="controls__row controls__row--three">
        <label className="field">
          <span>Tema</span>
          <select value={topic} onChange={(e) => onTopicChange(e.target.value)}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Ordenar</span>
          <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
            <option value="default">Orden original</option>
            <option value="date-desc">Fecha: más reciente</option>
            <option value="date-asc">Fecha: más antigua</option>
            <option value="title">Título (A-Z)</option>
          </select>
        </label>

        <div className="field">
          <span>Página {page}</span>
          <div className="pager">
            <button
              className="btn btn--ghost"
              onClick={() => onPageChange(page - 1)}
              disabled={loading || page === 1}
            >
              ← Anterior
            </button>
            <button className="btn" onClick={() => onPageChange(page + 1)} disabled={loading}>
              Siguiente →
            </button>
          </div>
        </div>
      </div>

      <div className="controls__row controls__row--bottom">
        <SearchBar value={search} onChange={onSearchChange} />
        <button className="btn btn--ghost" onClick={onClear} disabled={!hasFilters}>
          Limpiar filtros
        </button>
      </div>

      <p className="counter">
        Mostrando <strong>{shown}</strong> de <strong>{total}</strong> resultados
      </p>
    </section>
  );
}

export default Controls;
