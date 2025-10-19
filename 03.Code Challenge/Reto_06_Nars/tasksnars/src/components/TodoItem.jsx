import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <div className="todo-item">
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <label htmlFor={checkboxId} className={`todo-title ${todo.done ? "done" : ""}`}>
        {todo.title}
      </label>

      <div className="todo-actions">
        <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
