import React, { useState, useMemo } from "react";

import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";

/*
export default function App() {
  return (
    <main className="app">
      <h1>📝 To-Do List</h1>
      <p style={{opacity:0.8}}>Project scaffold ready.</p>
    </main>
  );
}
*/

export default function App() {
  // Initial sample todos
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), title: "Buy milk", done: false },
    { id: crypto.randomUUID(), title: "Study React", done: true },
    { id: crypto.randomUUID(), title: "Workout", done: false },
  ]);

  // 'all' | 'active' | 'done'
  const [filter, setFilter] = useState("all");

  // Derived counts (for the footer counter)
  const pendingCount = useMemo(
    () => todos.filter(t => !t.done).length,
    [todos]
  );
  const doneCount = useMemo(
    () => todos.filter(t => t.done).length,
    [todos]
  );

  return (
    <main className="app">
      <h1>📝 To-Do List</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>Project scaffold ready.</p>

      <div style={{ height: 12 }} />

      <TodoForm />

      <div style={{ height: 12 }} />

      <FilterBar />

      <div style={{ height: 12 }} />

      <TodoList />

      <div style={{ height: 16 }} />

      <div aria-live="polite">
        <strong>Stats:</strong> {pendingCount} pending / {doneCount} done
      </div>
    </main>
  );
}