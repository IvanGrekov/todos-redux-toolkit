import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from './store';
import { loadTodos } from './store/todosSlice';

import AddTodo from './components/Todos/AddTodo';
import TodoList from './components/Todos/TodoList';
import ReduxComponent from './components/Header';

import './App.css';

function App() {
    const { loading: todosLoading, error: todosError } = useSelector(
        (state: RootState) => state.todos,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(loadTodos(signal));

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    return (
        <div className="App">
            <ReduxComponent />

            {todosError && <h2>Oops, there is error, {todosError}</h2>}

            {todosLoading && <h2>Loading...</h2>}

            {!todosError && <AddTodo />}

            {!todosError && !todosLoading && <TodoList />}
        </div>
    );
}

export default App;
