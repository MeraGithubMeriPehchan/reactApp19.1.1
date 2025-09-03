import { useState } from "react";

function App() {
  // state for input
  const [task, setTask] = useState("");
  // state for todo list
  const [todos, setTodos] = useState([]);

  // Add task to todos
  const addTodo = () => {
    if (task.trim() === "") return; // ignore empty
    setTodos([...todos, task]); // add new task
    setTask(""); // clear input
  };

  // Delete task
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

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

      {/* Todo list */}
      <ul>
        {todos.map((t, index) => (
          <li key={index}>
            {t}{" "}
            <button onClick={() => deleteTodo(index)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
