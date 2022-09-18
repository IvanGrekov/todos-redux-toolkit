// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { actions as todosActions, LOAD } from './store/todos';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import ReduxComponent from './components/ReduxComponent';

import './App.css';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   // @ts-ignore:next-line
  //   dispatch(todosActions[LOAD]({ signal }));

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  return (
    <div className="App">
      <ReduxComponent />
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
