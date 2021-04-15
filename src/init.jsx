import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import i18next from 'i18next';
import faker from 'faker';

import i18nextInit from './app/utils/i18n.js';
import rootReducer from './app/reducers';
import App from './app/components/App.jsx';
import { addMessage } from './app/reducers/messages.js';
import { addChannel, removeChannel, renameChannel } from './app/reducers/channels.js';
import Context from './app/utils/context.js';
import { yupSetLocale } from './app/utils/validators.js';
import getRollbar from './app/utils/rollbar.js';

const getUserName = () => {
  const userName = Cookies.get('userName') ?? faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1, sameSite: 'strict' });

  return userName;
};

export default async ({ initialData, container }) => {
  const i18n = i18next.createInstance();
  yupSetLocale();

  const userName = getUserName();
  const rollbar = getRollbar();

  try {
    await i18nextInit(i18n);
  } catch (e) {
    const extra = { userName };
    rollbar.warn(e, extra);
    throw new Error(e);
  }

  const preloadedState = {
    channelsInfo: {
      channels: initialData.channels,
      currentChannelId: initialData.currentChannelId,
    },
    messagesInfo: {
      messages: initialData.messages,
    },
    languagesInfo: {
      activeLanguage: i18n.language,
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

  /* eslint-disable comma-dangle */
  render(
    <Provider store={store}>
      <Context.Provider value={{ userName, rollbar, i18n }}>
        <App />
      </Context.Provider>
    </Provider>,
    container
  );
};
