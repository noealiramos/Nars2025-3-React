import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return <p style={{ opacity: 0.8 }}>No tasks yet.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <li key={t.id}>
          <TodoItem todo={t} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
