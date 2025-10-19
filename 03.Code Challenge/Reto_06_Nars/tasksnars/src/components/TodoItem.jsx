import React, { useState, useRef, useEffect } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const checkboxId = `todo-${todo.id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const startEdit = () => {
    setDraft(todo.title);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.title);
    setIsEditing(false);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === todo.title) {
      // empty or no change → just exit
      setIsEditing(false);
      setDraft(todo.title);
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <div className="todo-item">
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {!isEditing ? (
        <label
          htmlFor={checkboxId}
          className={`todo-title ${todo.done ? "done" : ""} ${isEditing ? "is-editing" : ""}`}
          onDoubleClick={startEdit}
          title="Double-click to edit"
        >
          {todo.title}
        </label>
      ) : (
        <div style={{ display: "grid", gap: 4 }}>
          <input
            ref={inputRef}
            className="todo-edit"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
          />
          <span className="small-hint">Press Enter to save • Esc to cancel</span>
        </div>
      )}

      <div className="todo-actions">
        <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
