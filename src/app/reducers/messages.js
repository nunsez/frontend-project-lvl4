/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: { attributes } }) => {
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((m) => m.channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
