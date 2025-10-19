import React from "react";

export default function SearchBar({ query, onChange }) {
  return (
    <div className="searchbar">
      <input
        className="search-input"
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks by title"
      />
    </div>
  );
}
