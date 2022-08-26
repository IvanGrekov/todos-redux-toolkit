import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import counterReducer from './counter';
import themeReducer from './theme';
import todosReducer from './todos';
import { CounterType, ThemeType, TodosType } from '../types';

interface IState {
  counter: CounterType;
  theme: ThemeType;
  todos: TodosType;
}

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  todos: todosReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
store.subscribe(() => console.log(store.getState()));

//#region SELECTORS
export const getCounter = (state: IState) => state.counter;
export const getDifferenceBetweenCounterAndNumber = (number: number) => (
  (state: IState) => getCounter(state) - number
)
export const getTheme = (state: IState) => state.theme;
export const getTodos = (state: IState) => state.todos;
//#endregion

export default store;
