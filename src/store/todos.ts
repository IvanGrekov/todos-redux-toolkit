import { put, takeEvery, call } from "@redux-saga/core/effects";
import {
  getTodos as getTodosApiHelper,
  addTodo as addTodoApiHelper,
  changeTodo as changeTodoApiHelper,
  deleteTodo as deleteTodoApiHelper,
} from "../lib/todos";
import { ITodo, TodosType } from "../types";

export interface ITodosAction {
  type: string;
  todoId?: string;
  newTodos?: ITodo[];
  changingTodo?: ITodo;
  newTodoTitle?: string;
  requestOptions?: Object;
}

//#region ACTION_TYPES
export const PUT = 'todos/PUT';
export const DELETE = 'todos/DELETE';
export const ADD = 'todos/ADD';
export const CHANGE = 'todos/CHANGE';
export const LOAD = 'todos/LOAD';
export const ADD_TO_SERVER = 'todos/ADD_TO_SERVER';
export const CHANGE_ON_SERVER = 'todos/CHANGE_ON_SERVER';
export const DELETE_ON_SERVER = 'todos/DELETE_ON_SERVER';
//#endregion

//#region ACTION_CREATORS
export const actions = {
  [PUT]: (newTodos: ITodo[]) => ({ type: PUT, newTodos }),
  [DELETE]: (todoId: string) => ({ type: DELETE, todoId }),
  [ADD]: (newTodos: ITodo[]) => ({ type: ADD, newTodos }),
  [CHANGE]: (changingTodo: ITodo) => ({ type: CHANGE, changingTodo }),
  [LOAD]: (requestOptions = {}) => ({ type: LOAD, requestOptions }),
  [ADD_TO_SERVER]: (newTodoTitle: string) => ({ type: ADD_TO_SERVER, newTodoTitle }),
  [CHANGE_ON_SERVER]: (changingTodo: ITodo) => ({ type: CHANGE_ON_SERVER, changingTodo }),
  [DELETE_ON_SERVER]: (todoId: string) => ({ type: DELETE_ON_SERVER, todoId }),
};
//#endregion

//#region WORKERS
function* loadWorker(action: any): any {    
  const todosFromServer = yield call(getTodosApiHelper, action.requestOptions);
  yield put(actions[PUT](todosFromServer));
}

function* addToServerWorker(action: any): any {
  const todoFromServer = yield call(addTodoApiHelper, action.newTodoTitle);
  yield put(actions[ADD]([todoFromServer]));
}

function* changeOnServerWorker(action: any): any {
  const todoFromServer = yield call(changeTodoApiHelper, action.changingTodo);
  yield put(actions[CHANGE](todoFromServer));
}

function* deleteOnServerWorker(action: any): any {
  const result = yield call(deleteTodoApiHelper, action.todoId);
  if (result) {
    yield put(actions[DELETE](action.todoId));
  }
}
//#endregion

//#region WATCHERS
export function* todosWatcher() {
  yield takeEvery(LOAD, loadWorker);
  yield takeEvery(ADD_TO_SERVER, addToServerWorker);
  yield takeEvery(CHANGE_ON_SERVER, changeOnServerWorker);
  yield takeEvery(DELETE_ON_SERVER, deleteOnServerWorker);
}
//#endregion

function todosReducer(
  state: TodosType = [],
  action: ITodosAction = { type: '' },
) {
  switch(action.type) {
    case PUT:
      return [...(action.newTodos || [])];

    case DELETE:
      return state.filter((todo) => todo.id !== action.todoId);

    case ADD:
      return [...state, ...action.newTodos || []];

    case CHANGE:
      return state.map((todo) => (todo.id === action.changingTodo?.id ? action.changingTodo || todo : todo));
    
    default:
      return state;
  }
};

export default todosReducer;
