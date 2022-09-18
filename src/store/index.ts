import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import counterReducer from './counterSlice';
import themeReducer from './themeSlice';

const rootReducer = {
    todos: todosReducer,
    counter: counterReducer,
    theme: themeReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
