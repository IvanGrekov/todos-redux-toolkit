import { useState, useEffect, useCallback } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { getTodos, addTodo as addTodoApiHelper, changeTodo, deleteTodo as deleteTodoApiHelper } from './lib/todos';
import { ITodo } from './types';

import './App.css';

function App() {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getTodos({ signal })
      .then((data: Array<ITodo>) => setTodos(data))
      .catch((e) => console.warn('Error was occured during loading todos', e));

    return () => {
      controller.abort();
    };
  }, []);

  const addTodo = useCallback(async (newTodoTitle: string) => {
    try {
      await addTodoApiHelper(newTodoTitle)
        .then((data: ITodo) => {
          setTodos((currentTodos) => [...currentTodos, data]);
        })
        .catch((e) => console.warn('Error was occured during adding todo', e));

      return 'success';
    } catch (e) {
      console.warn('Error was occured during adding todo', e);
    }
  }, []);

  const toggleTodoStatus = useCallback(
    async (todoId: string) => {
      try {
        const changingTodo = todos.find(({ id }) => id === todoId) as ITodo;
        changingTodo.completed = !changingTodo.completed;

        await changeTodo(changingTodo)
          .then((data: ITodo) => {
            setTodos((currentTodos) =>
              currentTodos.map((todo) => (todo.id === todoId ? data : todo))
            );
          })
          .catch((e) =>
            console.warn('Error was occured during changing todo', e)
          );

        return 'success';
      } catch (e) {
        console.warn('Error was occured during changing todo', e);
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(async (todoId: string) => {
    try {
      await deleteTodoApiHelper(todoId)
        .then(() => {
          setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
        })
        .catch((e) => console.warn('Error was occured during deleting todo', e));

      return 'success';
    } catch (e) {
      console.warn('Error was occured during deleting todo', e);
    }
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await addTodo(newTodoTitle);
      setNewTodoTitle('');
    },
    [newTodoTitle]
  );

  return (
    <div className="App">
      <AddTodo
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={onInputChange}
        onSubmit={onSubmit}
      />
      <TodoList
        todos={todos}
        toggleTodoStatus={toggleTodoStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
