import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import ReduxComponent from './components/ReduxComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <ReduxComponent />
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
