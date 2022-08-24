import { useState, useCallback, useMemo, ChangeEventHandler } from 'react';

interface AddTodoProps {
  newTodoTitle: string;
  setNewTodoTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({
  newTodoTitle,
  setNewTodoTitle,
  onSubmit,
}) => {
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
          onChange={setNewTodoTitle}
        />
      </label>

      <button type="submit" disabled={isSubmitButtonDisabled}>
        Add todo
      </button>
    </form>
  );
};

export default AddTodo;
