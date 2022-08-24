import React, { useState } from 'react';
import { ITodo } from '../types';

export interface TodoItemProps {
  todo: ITodo;
  toggleTodoStatus: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={`todo-item ${loading ? 'todo-item--loading' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={async () => {
          setLoading(true);
          await toggleTodoStatus(todo.id);
          setLoading(false);
        }}
      />

      <h2 className="todo-title">{todo.title}</h2>

      <button
        className="todo-remove-button"
        onClick={async () => {
          setLoading(true);
          await deleteTodo(todo.id);
          setLoading(false);
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default TodoItem;
