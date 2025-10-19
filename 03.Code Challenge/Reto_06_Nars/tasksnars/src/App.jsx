import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";

const STORAGE_KEY = "tasksnars.todos.v1";

const sampleTodos = () => ([
  { id: crypto.randomUUID(), title: "Buy milk",   done: false },
  { id: crypto.randomUUID(), title: "Study React", done: true  },
  { id: crypto.randomUUID(), title: "Workout",    done: false },
]);

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleTodos();
    } catch {
      return sampleTodos();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  // filters
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'done'
  const [query, setQuery]   = useState("");    // text search

  // handlers
  const addTodo = (newTodo) => setTodos((prev) => [...prev, newTodo]);
  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));
  const editTodo = (id, newTitle) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));

  // stats
  const pendingCount = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
  const doneCount    = useMemo(() => todos.filter((t) =>  t.done).length, [todos]);

  // search + filter + order (pending first)
  const visibleTodos = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1) text search
    let list = q
      ? todos.filter((t) => t.title.toLowerCase().includes(q))
      : todos;

    // 2) status filter
    if (filter === "active") list = list.filter((t) => !t.done);
    if (filter === "done")   list = list.filter((t) =>  t.done);

    // 3) order: pending first
    return list.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }, [todos, filter, query]);

  return (
    <main className="app">
      <h1>📝 To-Do List</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>Project scaffold ready.</p>

      <div style={{ height: 12 }} />

      <TodoForm onAdd={addTodo} />

      <SearchBar query={query} onChange={setQuery} />

      <div style={{ height: 12 }} />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <div style={{ height: 12 }} />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <div style={{ height: 16 }} />

      <div aria-live="polite">
        <strong>Stats:</strong> {pendingCount} pending / {doneCount} done
      </div>
    </main>
  );
}
