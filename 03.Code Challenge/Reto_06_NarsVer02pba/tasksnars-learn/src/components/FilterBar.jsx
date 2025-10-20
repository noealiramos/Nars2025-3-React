import React from "react";

export default function FilterBar() {
  return (
    <nav className="filter-bar">
      <button className="btn filter-btn active">All</button>
      <button className="btn filter-btn">Active</button>
      <button className="btn filter-btn">Done</button>
    </nav>
  );
}
