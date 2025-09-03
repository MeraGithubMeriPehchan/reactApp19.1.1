import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul>
      {todos.map((t, index) => (
        <TodoItem
          key={index}
          task={t}
          onDelete={() => onDelete(index)}
          onToggle={() => onToggle(index)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
