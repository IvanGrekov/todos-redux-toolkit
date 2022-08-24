import React from 'react';
import TodoItem, { TodoItemProps } from './TodoItem';
import { ITodo } from '../types';

interface TodoListProps extends Omit<TodoItemProps, 'todo'> {
  todos: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodoStatus,
  deleteTodo,
}) => {
  return (
    <ul className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              toggleTodoStatus={toggleTodoStatus}
              deleteTodo={deleteTodo}
            />
          </li>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </ul>
  );
};

export default TodoList;
