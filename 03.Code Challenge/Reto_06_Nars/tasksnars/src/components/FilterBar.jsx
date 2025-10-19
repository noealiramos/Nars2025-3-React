import React from "react";

export default function FilterBar({ filter, onFilterChange }) {
  const btn = (key, label) => (
    <button
      className={`btn filter-btn ${filter === key ? "active" : ""}`}
      onClick={() => onFilterChange(key)}
      type="button"
    >
      {label}
    </button>
  );

  return (
    <nav className="filter-bar">
      {btn("all", "All")}
      {btn("active", "Active")}
      {btn("done", "Done")}
    </nav>
  );
}
