/* eslint-disable no-param-reassign */

import gon from 'gon';
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
        channels: gon.channels,
        currentChannelId: gon.currentChannelId,
    },
    reducers: {
        addChannel: (state, { payload: { channel } }) => {
            state.channels.push(channel);
        },
        // prettier-ignore
        removeChannel: (state, { payload: { id } }) => (
            state.channels.filter((c) => (c.removable ? c.id !== id : true))
        ),
        setCurrentChannelId: (state, { payload: { id } }) => {
            state.currentChannelId = id;
        },
    },
});

export const { addChannel, removeChannel, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
