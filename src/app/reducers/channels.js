/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
        channels: [],
        currentChannelId: null,
    },
    reducers: {
        addChannel: (state, { payload: { channel } }) => {
            state.channels.push(channel);
        },
        // prettier-ignore
        removeChannel: (state, { payload: { id } }) => (
            state.channels.filter((c) => (c.removable ? c.id !== id : true))
        ),
        replaceChannels: (state, { payload: { channels } }) => {
            state.channels = channels;
        },
        setCurrentChannelId: (state, { payload: { id } }) => {
            state.currentChannelId = id;
        },
    },
});

// prettier-ignore
export const {
    addChannel, removeChannel, replaceChannels, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
