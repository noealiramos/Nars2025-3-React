import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("⚠️ Task title cannot be empty");
      return;
    }
    onAdd({ id: crypto.randomUUID(), title: trimmed, done: false });
    setTitle("");
    setError("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="row">
        <input
          className="input"
          type="text"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />
        <button className="btn btn-primary" type="submit" disabled={!title.trim()}>
          Add
        </button>
        {error && (
          <div role="alert" className="alert">
            {error}
          </div>
        )}
      </div>
    </form>
  );
}
