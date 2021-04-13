import Rollbar from 'rollbar';

// prettier-ignore
export default () => (
  new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
);
