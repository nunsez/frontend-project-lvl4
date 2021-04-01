/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState: {},
    reducers: {
        openModal: (state, { payload: { type, extra = null } }) => {
            state.isOpened = true;
            state.type = type;
            state.extra = extra;
        },
        closeModal: (state) => {
            state.isOpened = false;
            state.type = null;
            state.extra = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
