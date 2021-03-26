/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messagesInfo',
    initialState: {
        messages: [],
    },
    reducers: {
        replaceMessages: (state, { payload: { messages } }) => {
            state.messages = messages;
        },
        addMessage: (state, { payload: { message } }) => {
            state.messages.push(message);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addMessage, replaceMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
