import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITodo, TodosType } from '../types';

const initialState: TodosType = {
    todos: [],
};

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
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers,
});

export const { addTodo, changeTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
