import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as todosActions, ADD_TO_SERVER } from '../store/todos';

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = ({}) => {
  const dispatch = useDispatch();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = useCallback(
    async (newTodoTitle: string) =>
      // @ts-ignore:next-line
      await dispatch(todosActions[ADD_TO_SERVER](newTodoTitle)),
    []
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await addTodo(newTodoTitle);
      if (result) {
        setNewTodoTitle('');
      }
    },
    [newTodoTitle]
  );

  const isSubmitButtonDisabled = useMemo(
    () => newTodoTitle.trim().length === 0,
    [newTodoTitle]
  );

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
