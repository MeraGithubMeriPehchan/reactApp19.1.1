// src/components/TodoApiDemo.js
import React, { useEffect, useState } from "react";

export default function TodoApiDemo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add new todo
  const addTodo = async () => {
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });
    const data = await res.json();
    setTodos((prev) => [...prev, data]);
    setNewTodo("");
  };

  // Toggle done
  const toggleTodo = async (id, done) => {
  await fetch(`http://localhost:5000/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !done }),
  });
  setTodos((prev) =>
    prev.map((t) => (t._id === id ? { ...t, done: !done } : t))
  );
};

  // Delete
const deleteTodo = async (id) => {
  await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
  setTodos((prev) => prev.filter((t) => t._id !== id));
};

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Todo API Demo</h2>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
  <li key={todo._id}>
    <span
      style={{
        textDecoration: todo.done ? "line-through" : "none",
        cursor: "pointer",
      }}
      onClick={() => toggleTodo(todo._id, todo.done)}
    >
      {todo.text}
    </span>
    <button onClick={() => deleteTodo(todo._id)}>❌</button>
  </li>
))}

      </ul>
    </div>
  );
}
