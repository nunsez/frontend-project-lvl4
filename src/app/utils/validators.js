import * as yup from 'yup';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;

export const getYupFeedback = (type) => () => {
  const key = `validation.${type}`;

  switch (type) {
    case 'range':
      return { key, min: CHANNEL_NAME_MIN_LENGTH, max: CHANNEL_NAME_MAX_LENGTH };

    default:
      return { key };
  }
};

export const getChannelNamesSchema = (channelsByName) => {
  const channelNamesSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required()
      .min(CHANNEL_NAME_MIN_LENGTH)
      .max(CHANNEL_NAME_MAX_LENGTH)
      .notOneOf(channelsByName),
  });

  return channelNamesSchema;
};

export const getChatMessagesSchema = () => {
  const chatMessagesSchema = yup.object({
    body: yup.string().trim().required(),
  });

  return chatMessagesSchema;
};
