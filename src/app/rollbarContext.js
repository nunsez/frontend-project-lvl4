import Rollbar from 'rollbar';
import { createContext } from 'react';

const rollbar = new Rollbar({
    // POST CLIENT ITEM TOKEN
    accessToken: process.env.ROLLBAR_TOKEN ?? null,
    captureUncaught: true,
    captureUnhandledRejections: true,
});

const RollbarContext = createContext(rollbar);

export default RollbarContext;
