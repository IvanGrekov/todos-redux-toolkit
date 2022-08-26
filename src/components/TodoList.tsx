import React, { useEffect } from 'react';
import { actions as todosActions, LOAD } from '../store/todos';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos as getTodosFromStore } from '../store';
import TodoItem from './TodoItem';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = ({}) => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosFromStore);

  useEffect(() => {
    if (todos.length === 0) {
      // @ts-ignore:next-line
      dispatch(todosActions[LOAD]());
    }
  }, [todos]);

  return (
    <ul className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </ul>
  );
};

export default TodoList;
