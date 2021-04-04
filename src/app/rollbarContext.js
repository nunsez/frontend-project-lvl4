import Rollbar from 'rollbar';
import { createContext } from 'react';

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
console.log('token:', process.env.ROLLBAR_TOKEN);

const RollbarContext = createContext(rollbar);

export default RollbarContext;
