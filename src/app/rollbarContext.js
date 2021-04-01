import Rollbar from 'rollbar';
import { createContext } from 'react';

const rollbar = new Rollbar({
    // POST CLIENT ITEM TOKEN
    accessToken: 'a962f266ab24450dbfef5afc45a35798',
    captureUncaught: true,
    captureUnhandledRejections: true,
});

const RollbarContext = createContext(rollbar);

export default RollbarContext;
