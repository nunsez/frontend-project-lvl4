import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import rootReducer from './app/reducers';
import App from './app/components/App.jsx';
import { addMessage } from './app/reducers/messages.js';
import { addChannel, removeChannel, renameChannel } from './app/reducers/channels.js';
import RollBarContext from './app/rollbarContext.js';

const socket = io({ multiplex: false });

export default ({ gon, container, rollbar }) => {
  const preloadedState = {
    channelsInfo: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesInfo: {
      messages: gon.messages,
    },
    modalInfo: {
      isOpened: false,
      type: null,
      extra: null,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socketEventMapping = {
    newMessage: ({ data: { attributes } }) => store.dispatch(addMessage({ attributes })),
    newChannel: ({ data: { attributes } }) => store.dispatch(addChannel({ attributes })),
    renameChannel: ({ data: { attributes } }) => store.dispatch(renameChannel({ attributes })),
    removeChannel: ({ data: { id } }) => store.dispatch(removeChannel({ id })),
  };

  const listener = (eventName, message) => {
    console.log(`websocket eventName: ${eventName};`, 'data logger:', message.data);
    return socketEventMapping[eventName](message);
  };

  socket.onAny(listener);

  /* eslint-disable comma-dangle */
  render(
    <Provider store={store}>
      <RollBarContext.Provider value={rollbar}>
        <App />
      </RollBarContext.Provider>
    </Provider>,
    container
  );
};
