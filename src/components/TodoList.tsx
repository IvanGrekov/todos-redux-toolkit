import React from 'react';
import { useSelector } from 'react-redux';
import { getTodos as getTodosFromStore } from '../store';
import TodoItem from './TodoItem';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = ({}) => {
  const todos = useSelector(getTodosFromStore);
  
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
