import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import faker from 'faker';
import i18n from './app/i18n.js';

import rootReducer from './app/reducers';
import App from './app/components/App.jsx';
import { addMessage } from './app/reducers/messages.js';
import { addChannel, removeChannel, renameChannel } from './app/reducers/channels.js';
import Context from './app/context.js';

const avaibleLanguages = [
  { name: 'English', tag: 'en' },
  { name: 'Русский', tag: 'ru' },
];

const getUserName = () => {
  const userName = Cookies.get('userName') ?? faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1, sameSite: 'strict' });

  return userName;
};

export default ({ gon, container }) => {
  const preloadedState = {
    channelsInfo: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesInfo: {
      messages: gon.messages,
    },
    languagesInfo: {
      activeLanguage: i18n.language,
      avaibleLanguages,
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

  /* eslint-disable comma-dangle */
  render(
    <Provider store={store}>
      <Context.Provider value={{ userName }}>
        <App />
      </Context.Provider>
    </Provider>,
    container
  );
};
