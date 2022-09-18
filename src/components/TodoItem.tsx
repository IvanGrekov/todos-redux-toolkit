import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeTodo, removeTodo } from '../store/todosSlice';
import { ITodo } from '../types';

export interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleTodoStatus = useCallback(async () => {
    const changingTodo: ITodo = {
      ...todo,
      completed: !todo.completed,
    };

    dispatch(changeTodo(changingTodo));
  }, [dispatch, todo]);

  const deleteTodo = useCallback(async () => {
    dispatch(removeTodo(todo.id));
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
