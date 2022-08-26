import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  actions as todosActions,
  CHANGE_ON_SERVER,
  DELETE_ON_SERVER,
} from '../store/todos';
import { ITodo } from '../types';

export interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const toggleTodoStatus = useCallback(async () => {
    const changingTodo: ITodo = {
      ...todo,
      completed: !todo.completed,
    };

    // @ts-ignore:next-line
    await dispatch(todosActions[CHANGE_ON_SERVER](changingTodo));
  }, [todo]);

  const deleteTodo = useCallback(async () => {
    // @ts-ignore:next-line
    await dispatch(todosActions[DELETE_ON_SERVER](todo.id));
  }, [todo]);

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
