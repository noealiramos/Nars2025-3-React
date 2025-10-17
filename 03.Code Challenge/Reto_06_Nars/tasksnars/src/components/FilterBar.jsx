import React from "react";

export default function FilterBar() {
  return (
    <nav style={{ display: "flex", gap: 8 }}>
      <button>All</button>
      <button>Active</button>
      <button>Done</button>
    </nav>
  );
}
