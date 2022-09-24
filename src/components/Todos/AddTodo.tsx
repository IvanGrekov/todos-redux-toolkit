import { useState, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../store';
import { addToServer } from '../../store/todosSlice';

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const dispatch = useAppDispatch();

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    }, []);

    const onSubmit = useCallback(
        async (e: any) => {
            e.preventDefault();

            const todo = await dispatch(addToServer(e.target?.['new-todo-title']?.value));

            if (todo) {
                setNewTodoTitle('');
            }
        },
        [dispatch],
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
