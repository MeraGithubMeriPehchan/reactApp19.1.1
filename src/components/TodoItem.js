function TodoItem({ task, onDelete, onToggle }) {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {task.text}
      <button onClick={onToggle}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={onDelete}>❌ Delete</button>
    </li>
  );
}

export default TodoItem;
