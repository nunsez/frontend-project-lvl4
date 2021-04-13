// @ts-check

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';
import init from './init.jsx';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

init({ initialData: gon, container });
