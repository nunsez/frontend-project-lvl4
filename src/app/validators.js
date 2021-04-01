const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;

export const chatMessageValidate = ({ body }) => {
  const errors = {};
  const { length } = body.trim();

  if (length === 0) {
    errors.body = 'Required';
  }

  return errors;
};

export const channelNameValidate = (channelsByName) => ({ name }) => {
  const errors = {};
  const { length } = name.trim();

  if (length < CHANNEL_NAME_MIN_LENGTH || length > CHANNEL_NAME_MAX_LENGTH) {
    errors.name = `Must be ${CHANNEL_NAME_MIN_LENGTH} to ${CHANNEL_NAME_MAX_LENGTH} characters`;
  }
  if (channelsByName.includes(name)) {
    errors.name = 'Must be unique';
  }
  if (length === 0) {
    errors.name = 'Required';
  }

  return errors;
};
