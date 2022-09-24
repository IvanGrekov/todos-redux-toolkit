import React, { useCallback } from 'react';
import { useAppDispatch } from '../../store';
import { changeOnServer, removeOnServer } from '../../store/todosSlice';
import { ITodo } from '../../types';

export interface TodoItemProps {
    todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
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
        <div className={`todo-item ${todo.isLoading ? 'todo-item--loading' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={toggleTodoStatus} />

            <h2 className="todo-title">{todo.title}</h2>

            <button className="todo-remove-button" onClick={deleteTodo}>
                &times;
            </button>
        </div>
    );
};

export default TodoItem;
