import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CounterType } from '../types';

const initialState: CounterType = {
    value: 0,
};

const reducers = {
    increase(state: CounterType) {
        state.value += 1;
    },

    decrease(state: CounterType) {
        state.value -= 1;
    },

    add(state: CounterType, action: PayloadAction<number>) {
        state.value += action.payload;
    },

    subtract(state: CounterType, action: PayloadAction<number>) {
        state.value -= action.payload;
    },

    clear(state: CounterType) {
        state.value = 0;
    },
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers,
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
