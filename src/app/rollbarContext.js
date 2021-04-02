import Rollbar from 'rollbar';
import { createContext } from 'react';

const token = process?.env?.ROLLBAR_TOKEN;

console.log('process.env.ROLLBAR_TOKEN:', token);

const rollbar = new Rollbar({
  accessToken: token,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const RollbarContext = createContext(rollbar);

export default RollbarContext;
