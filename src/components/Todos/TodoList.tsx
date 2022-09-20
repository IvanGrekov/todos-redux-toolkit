import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { RootState } from '../../store';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <ul className="todo-list">
            {/* {todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))
      ) : (
        <h2>Loading...</h2>
      )} */}
            {todos.map((todo) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} />
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
