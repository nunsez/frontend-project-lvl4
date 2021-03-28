/* eslint-disable no-param-reassign */

import gon from 'gon';
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messagesInfo',
    initialState: {
        messages: gon.messages,
    },
    reducers: {
        addMessage: (state, { payload: { attributes } }) => {
            state.messages.push(attributes);
        },
    },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
