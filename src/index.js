// @ts-check

// @ts-ignore
import gon from 'gon';
import Rollbar from 'rollbar';
import init from './init.jsx';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

init({ gon, container, rollbar });
