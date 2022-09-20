import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
