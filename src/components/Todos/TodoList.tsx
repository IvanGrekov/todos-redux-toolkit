import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import TodoItem from './TodoItem';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
    const { todos } = useSelector((state: RootState) => state.todos);

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} />
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
