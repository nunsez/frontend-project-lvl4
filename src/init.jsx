import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import Rollbar from 'rollbar';
import faker from 'faker';

import rootReducer from './app/reducers';
import App from './app/components/App.jsx';
import { addMessage } from './app/reducers/messages.js';
import { addChannel, removeChannel, renameChannel } from './app/reducers/channels.js';
import Context from './app/context.js';

const getUserName = () => {
  const userName = Cookies.get('userName') ?? faker.internet.userName();
  Cookies.set('nickname', userName, { expires: 1, sameSite: 'strict' });

  return userName;
};

// prettier-ignore
const getRollbar = () => (
  new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
);

export default ({ gon, container }) => {
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

  const socket = io({ multiplex: false });
  const listener = (eventName, message) => socketEventMapping[eventName](message);
  socket.onAny(listener);

  const userName = getUserName();
  const rollbar = getRollbar();

  /* eslint-disable comma-dangle */
  render(
    <Provider store={store}>
      <Context.Provider value={{ userName, rollbar }}>
        <App />
      </Context.Provider>
    </Provider>,
    container
  );
};
