import {
  getTodos as getTodosApiHelper,
  addTodo as addTodoApiHelper,
  changeTodo as changeTodoApiHelper,
  deleteTodo as deleteTodoApiHelper,
} from "../lib/todos";
import { ITodo, TodosType } from "../types";

export interface ICounterAction {
  type: string;
  todoId?: string;
  newTodos?: ITodo[];
  changingTodo?: ITodo;
}

//#region ACTION_TYPES
export const DELETE = 'todos/DELETE';
export const ADD = 'todos/ADD';
export const CHANGE = 'todos/CHANGE';
export const LOAD = 'todos/INCREASE';
export const ADD_TO_SERVER = 'todos/ADD_TO_SERVER';
export const CHANGE_ON_SERVER = 'todos/CHANGE_ON_SERVER';
export const DELETE_ON_SERVER = 'todos/DELETE_ON_SERVER';
//#endregion

//#region ACTION_CREATORS
export const actions = {
  [DELETE]: (todoId: string) => ({ type: DELETE, todoId }),
  [ADD]: (newTodos: ITodo[]) => ({ type: ADD, newTodos }),
  [CHANGE]: (changingTodo: ITodo) => ({ type: CHANGE, changingTodo }),
  [LOAD]: (requestOptions = {}) => async(dispatch: Function) => {
    try {
      const todosFromServer: ITodo[] = await getTodosApiHelper(requestOptions);
  
      dispatch(actions[ADD](todosFromServer));

      return 'success';
    } catch(e) {
      console.warn('Error was occured during loading todos', e);
    }
  },
  [ADD_TO_SERVER]: (newTodoTitle: string) => async(dispatch: Function) => {
    try {
      const todoFromServer: ITodo = await addTodoApiHelper(newTodoTitle);
  
      dispatch(actions[ADD]([todoFromServer]));

      return 'success';
    } catch(e) {
      console.warn('Error was occured during adding todo', e);
    }
  },
  [CHANGE_ON_SERVER]: (changingTodo: ITodo) => async(dispatch: Function) => {
    try {
      const todoFromServer: ITodo = await changeTodoApiHelper(changingTodo);
  
      dispatch(actions[CHANGE](todoFromServer));

      return 'success';
    } catch(e) {
      console.warn('Error was occured during changing todo', e);
    }
  },
  [DELETE_ON_SERVER]: (todoId: string) => async(dispatch: Function) => {
    try {
      await deleteTodoApiHelper(todoId);
  
      dispatch(actions[DELETE](todoId));

      return 'success';
    } catch(e) {
      console.warn('Error was occured during changing todo', e);
    }
  },
};
//#endregion

function todosReducer(
  state: TodosType = { todos: [] },
  action: ICounterAction = { type: '' },
) {
  switch(action.type) {
    case DELETE:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.todoId),
      };

    case ADD:
      return {
        todos: [...state.todos, ...action.newTodos || []],
      };

    case CHANGE:
      return {
        todos: state.todos.map((todo) => (todo.id === action.changingTodo?.id ? action.changingTodo : todo))
      };
    
    default:
      return state;
  }
};

export default todosReducer;
