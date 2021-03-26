// @ts-check

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// @ts-ignore
import gon from 'gon';
import rootReducer from './app/reducers';
import App from './app/components/App.jsx';
import { replaceChannels, setCurrentChannelId } from './app/reducers/channels.js';
import { replaceMessages } from './app/reducers/messages.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

const p = document.createElement('p');
p.classList.add('card-text');
p.textContent = 'It works!';

const h5 = document.createElement('h5');
h5.classList.add('card-title');
h5.textContent = 'Project frontend l4 boilerplate';

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
cardBody.append(h5, p);

const card = document.createElement('div');
card.classList.add('card', 'text-center');
card.append(cardBody);

const container = document.querySelector('#chat');
container.append(card);

console.log('it works!');
console.log('gon', gon);

const store = configureStore({
    reducer: rootReducer,
});

const { channels, messages, currentChannelId } = gon;

store.dispatch(replaceChannels({ channels }));
store.dispatch(replaceMessages({ messages }));
store.dispatch(setCurrentChannelId({ currentChannelId }));

/* eslint-disable comma-dangle */
render(
    <Provider store={store}>
        <App gon={gon} />
    </Provider>,
    container
);
