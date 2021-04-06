import * as yup from 'yup';
import i18n from './i18n.js';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;

const t = i18n.t.bind(i18n);

const channelNameRangeMessage = t('validation.range', {
  min: CHANNEL_NAME_MIN_LENGTH,
  max: CHANNEL_NAME_MAX_LENGTH,
});

yup.setLocale({
  string: {
    min: channelNameRangeMessage,
    max: channelNameRangeMessage,
  },
  mixed: {
    required: 'validation.required',
    notOneOf: 'validation.notOneOf',
  },
});

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

export const chatMessagesSchema = yup.object({
  body: yup.string().trim().required(),
});
