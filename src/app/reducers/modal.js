/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState: {
        isOpened: false,
        type: null,
        extra: null,
    },
    reducers: {
        open: (state) => {
            state.isOpened = true;
        },
        close: (state) => {
            state.isOpened = false;
        },
        setType: (state, { payload: { type } }) => {
            state.type = type;
        },
        setExtra: (state, { payload: { extra } }) => {
            state.extra = extra;
        },
    },
});

// prettier-ignore
export const {
    open, close, setType, setExtra,
} = modalSlice.actions;

export default modalSlice.reducer;
