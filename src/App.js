import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const confirmDelete = (index) => {
    setTodoToDelete(index); // store which todo is to be deleted
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
      <h1>Todo App (with Delete Confirmation Modal)</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={confirmDelete} onToggle={toggleTodo} />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Are you sure you want to delete this task?</h2>
          <button onClick={deleteTodo}>Yes, Delete</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
