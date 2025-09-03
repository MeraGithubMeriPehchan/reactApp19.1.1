import { useState, useEffect } from "react";

function App() {
  // state for input
  const [task, setTask] = useState("");
  // state for todo list
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add task to todos
  const addTodo = () => {
    if (task.trim() === "") return; // ignore empty
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  // Delete task
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Clear all todos
  const clearAll = () => {
    setTodos([]);
  };

  // Count remaining todos
  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <h1>Step 3: Todo App</h1>

      {/* Input box */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTodo}>Add</button>

      {/* Counter */}
      <p>{remainingCount} todos left</p>

      {/* Clear All button */}
      {todos.length > 0 && (
        <button onClick={clearAll}>Clear All</button>
      )}

      {/* Todo list */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>{" "}
            <button onClick={() => toggleComplete(index)}>
              {todo.completed ? '↩️ Undo' : '✅ Complete'}
            </button>
            <button onClick={() => deleteTodo(index)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
