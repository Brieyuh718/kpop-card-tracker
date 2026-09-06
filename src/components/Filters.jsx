export default function Filters({ activeFilter, setActiveFilter, query, setQuery }) {
  const filters = ['All cards', 'Collected', 'Wishlist']

  return (
    <div className="filter-row">
      <div className="filter-tabs" aria-label="Filter photocards">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? 'active' : ''}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <label className="search-box">
        <span className="sr-only">Search cards</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search artist or member"
        />
      </label>
    </div>
  )
}
