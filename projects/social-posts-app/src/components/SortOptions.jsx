import './SortOptions.css';

function SortOptions({ sortBy, setSortBy }) {
  return (
    <div className="sort-options">
      <span className="sort-label">Order by:</span>
      <button
        onClick={() => setSortBy('newest')}
        className={`sort-button ${sortBy === 'newest' ? 'active' : ''}`}
      >
        Newest
      </button>
      <button
        onClick={() => setSortBy('popular')}
        className={`sort-button ${sortBy === 'popular' ? 'active' : ''}`}
      >
        Most Popular
      </button>
    </div>
  );
}

export default SortOptions;
