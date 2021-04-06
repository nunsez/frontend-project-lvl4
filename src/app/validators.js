import * as yup from 'yup';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;
const CHANNEL_NAME_RANGE_LENGTH = `${CHANNEL_NAME_MIN_LENGTH} to ${CHANNEL_NAME_MAX_LENGTH}`;
const CHANNEL_NAME_RANGE_MESSAGE = `Must be ${CHANNEL_NAME_RANGE_LENGTH} characters`;

export const getChannelNamesSchema = (channelsByName) => {
  const channelNamesSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Required')
      .min(CHANNEL_NAME_MIN_LENGTH, CHANNEL_NAME_RANGE_MESSAGE)
      .max(CHANNEL_NAME_MAX_LENGTH, CHANNEL_NAME_RANGE_MESSAGE)
      .notOneOf(channelsByName, 'Must be unique'),
  });

  return channelNamesSchema;
};

export const chatMessagesSchema = yup.object({
  body: yup.string().trim().required('Required'),
});
