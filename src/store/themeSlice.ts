import { createSlice } from '@reduxjs/toolkit';
import { ThemeType } from '../types';

const initialState: ThemeType = {
    value: 'light',
};

const reducers = {
    toggle(state: ThemeType) {
        state.value = state.value === 'light' ? 'dark' : 'light';
    },
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers,
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
