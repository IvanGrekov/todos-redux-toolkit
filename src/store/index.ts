import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import { all } from '@redux-saga/core/effects';
import counterReducer, { counterWatcher } from './counter';
import themeReducer from './theme';
import todosReducer, { todosWatcher } from './todos';
import { CounterType, ThemeType, TodosType } from '../types';

interface IState {
  counter: CounterType;
  theme: ThemeType;
  todos: TodosType;
}
const sagaMiddleware = createSagaMiddleware();
function* rootWatcher() {
  yield all([counterWatcher(), todosWatcher()])
}

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  todos: todosReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootWatcher);

//#region SELECTORS
export const getCounter = (state: IState) => state.counter;
export const getDifferenceBetweenCounterAndNumber = (number: number) => (
  (state: IState) => getCounter(state) - number
)
export const getTheme = (state: IState) => state.theme;
export const getTodos = (state: IState) => state.todos;
//#endregion

export default store;
