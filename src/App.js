import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import FormDemo from "./components/FormDemo";
import UseRefDemo from "./components/UseRefDemo";
import MemoDemo from "./components/memo";
import CallbackDemo from "./components/useCallback";

function App() {
  // ✅ Initialize state from localStorage (runs only once)
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // ✅ Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const confirmDelete = (index) => {
    setTodoToDelete(index);
    setModalOpen(true);
  };

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos(todos.filter((_, i) => i !== todoToDelete));
      setTodoToDelete(null);
      setModalOpen(false);
    }
  };

  const toggleTodo = (index) => {
    const updated = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
  };

  return (
    <div>
      <h1>Todo App (with Modal + localStorage ✅ Fixed)</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={confirmDelete} onToggle={toggleTodo} />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Are you sure you want to delete this task?</h2>
          <button onClick={deleteTodo}>Yes, Delete</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      )}
      {/* <FormDemo />
      <UseRefDemo/>
      <MemoDemo/> */}
      <CallbackDemo/>
    </div>
  );
}

export default App;
