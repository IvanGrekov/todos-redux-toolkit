import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
    getTodos as getTodosApiHelper,
    addTodo as addTodoApiHelper,
    changeTodo as changeTodoApiHelper,
    deleteTodo as deleteTodoApiHelper,
} from '../lib/todos';
import { ITodo, TodosType } from '../types';

// TODO: pass data to pending

const initialState: TodosType = {
    todos: [],
    loading: false,
    addingTodo: false,
    error: null,
};

export const loadTodos = createAsyncThunk(
    'todos/loadTodos',
    async (requestOptions: Object, { rejectWithValue }) => {
        try {
            const todosFromServer: ITodo[] = await getTodosApiHelper(requestOptions || {});

            return todosFromServer;
        } catch (e) {
            return rejectWithValue('Error was occured during loading todos');
        }
    },
);

export const addToServer = createAsyncThunk(
    'todos/addToServer',
    async (newTodoTitle: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAddingTodoLoading());
            const todoFromServer: ITodo = await addTodoApiHelper(newTodoTitle);
            dispatch(addTodo([todoFromServer]));
            dispatch(removeAddingTodoLoading());

            return todoFromServer;
        } catch (e) {
            return rejectWithValue('Error was occured during adding todo');
        }
    },
);

export const changeOnServer = createAsyncThunk(
    'todos/changeOnServer',
    async (changingTodo: ITodo, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setTodoLoading(changingTodo.id));
            const todoFromServer: ITodo = await changeTodoApiHelper(changingTodo);
            dispatch(changeTodo(todoFromServer));
            dispatch(removeTodoLoading(changingTodo.id));
        } catch (e) {
            return rejectWithValue('Error was occured during changing todo');
        }
    },
);

export const removeOnServer = createAsyncThunk(
    'todos/removeOnServer',
    async (todoId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setTodoLoading(todoId));
            await deleteTodoApiHelper(todoId);
            dispatch(removeTodo(todoId));
        } catch (e) {
            return rejectWithValue('Error was occured during removing todo');
        }
    },
);

const reducers = {
    addTodo(state: TodosType, action: PayloadAction<ITodo[]>) {
        state.todos.push(...action.payload);
    },

    changeTodo(state: TodosType, action: PayloadAction<ITodo>) {
        const todo = state.todos.find((todo: ITodo) => todo.id === action.payload?.id);

        if (todo) {
            todo.completed = !todo?.completed;
        }
    },

    removeTodo(state: TodosType, action: PayloadAction<ITodo['id']>) {
        state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload);
    },

    setTodoLoading(state: TodosType, action: PayloadAction<ITodo['id']>) {
        state.todos.forEach((todo: ITodo) => {
            if (todo.id === action.payload) {
                todo.isLoading = true;
            }
        });
    },

    removeTodoLoading(state: TodosType, action: PayloadAction<ITodo['id']>) {
        state.todos.forEach((todo: ITodo) => {
            if (todo.id === action.payload) {
                todo.isLoading = false;
            }
        });
    },

    setAddingTodoLoading(state: TodosType) {
        state.addingTodo = true;
    },

    removeAddingTodoLoading(state: TodosType) {
        state.addingTodo = false;
    },
};

const setError = (state: TodosType, action: PayloadAction<unknown>) => {
    state.loading = false;
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers,
    extraReducers: (builder) => {
        //#region loadTodos
        builder
            .addCase(loadTodos.pending, (state: TodosType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTodos.fulfilled, (state: TodosType, action: PayloadAction<ITodo[]>) => {
                state.todos = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loadTodos.rejected, setError);
        //#endregion

        //#region addTodoToServer
        builder.addCase(addToServer.rejected, setError);
        //#endregion

        //#region changeTodoOnServer
        builder.addCase(changeOnServer.rejected, setError);
        //#endregion

        //#region removeTodoOnServer
        builder.addCase(removeOnServer.rejected, setError);
        //#endregion
    },
});

export const {
    addTodo,
    changeTodo,
    removeTodo,
    setTodoLoading,
    removeTodoLoading,
    setAddingTodoLoading,
    removeAddingTodoLoading,
} = todoSlice.actions;

export default todoSlice.reducer;
