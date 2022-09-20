import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo as addTodoToStore } from '../../store/todosSlice';
import { ITodo } from '../../types';

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const dispatch = useDispatch();

    const addTodo = useCallback(
        (title: string): void => {
          const newTodo: ITodo = {
            id: (Math.random() * Math.random()).toString(),
            title,
            completed: false,
          };

          dispatch(addTodoToStore([newTodo]))
        },
        [dispatch]
    );

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    }, []);

    const onSubmit = useCallback(
       (e: any) => {            
            e.preventDefault();

            addTodo(e.target?.['new-todo-title']?.value);
            setNewTodoTitle('');
        },
        [addTodo],
    );

    const isSubmitButtonDisabled = useMemo(() => newTodoTitle.trim().length === 0, [newTodoTitle]);

    return (
        <form className="form" onSubmit={onSubmit} name="add-todo">
            <label htmlFor="new-todo-input">
                <input
                    id="new-todo-input"
                    name="new-todo-title"
                    value={newTodoTitle}
                    onChange={onInputChange}
                />
            </label>

            <button type="submit" disabled={isSubmitButtonDisabled}>
                Add todo
            </button>
        </form>
    );
};

export default AddTodo;
