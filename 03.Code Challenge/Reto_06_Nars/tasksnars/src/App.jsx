import React, { useState, useMemo } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), title: "Buy milk", done: false },
    { id: crypto.randomUUID(), title: "Study React", done: true },
    { id: crypto.randomUUID(), title: "Workout", done: false },
  ]);

  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'done'

  const addTodo = (newTodo) => setTodos((prev) => [...prev, newTodo]);

  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const pendingCount = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
  const doneCount    = useMemo(() => todos.filter((t) =>  t.done).length, [todos]);

  // ⬇️ Filtro + orden: pendientes arriba
  const visibleTodos = useMemo(() => {
    let list = todos;
    if (filter === "active") list = todos.filter((t) => !t.done);
    if (filter === "done")   list = todos.filter((t) =>  t.done);
    // Orden: pending (done=false) first
    return list.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }, [todos, filter]);

  return (
    <main className="app">
      <h1>📝 To-Do List</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>Project scaffold ready.</p>

      <div style={{ height: 12 }} />

      <TodoForm onAdd={addTodo} />

      <div style={{ height: 12 }} />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <div style={{ height: 12 }} />

      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />

      <div style={{ height: 16 }} />

      <div aria-live="polite">
        <strong>Stats:</strong> {pendingCount} pending / {doneCount} done
      </div>
    </main>
  );
}
