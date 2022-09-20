import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../../store';
import { changeOnServer, removeOnServer } from '../../store/todosSlice';
import { ITodo } from '../../types';

export interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const toggleTodoStatus = useCallback(async () => {
    const changingTodo: ITodo = {
      ...todo,
      completed: !todo.completed,
    };

    dispatch(changeOnServer(changingTodo));
  }, [dispatch, todo]);

  const deleteTodo = useCallback(async () => {
    dispatch(removeOnServer(todo.id));
  }, [dispatch, todo]);

  return (
    <div className={`todo-item ${loading ? 'todo-item--loading' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={async () => {
          setLoading(true);
          await toggleTodoStatus();
          setLoading(false);
        }}
      />

      <h2 className="todo-title">{todo.title}</h2>

      <button
        className="todo-remove-button"
        onClick={async () => {
          setLoading(true);
          await deleteTodo();
          setLoading(false);
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default TodoItem;
