/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {},
  reducers: {
    addChannel: ({ channels }, { payload: { attributes } }) => {
      channels.push(attributes);
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((c) => (c.removable ? c.id !== id : true));
    },
    renameChannel: ({ channels }, { payload: { attributes } }) => {
      const currentChannel = channels.find((c) => c.id === attributes.id);
      const index = channels.indexOf(currentChannel);
      channels[index] = attributes;
    },
    setCurrentChannelId: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
  },
});

// prettier-ignore
export const {
  addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
