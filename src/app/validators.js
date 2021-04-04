import * as yup from 'yup';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;
const CHANNEL_NAME_RANGE_LENGTH = `${CHANNEL_NAME_MIN_LENGTH} to ${CHANNEL_NAME_MAX_LENGTH}`;
const CHANNEL_NAME_RANGE_MESSAGE = `Must be ${CHANNEL_NAME_RANGE_LENGTH} characters`;

const baseModalSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .min(CHANNEL_NAME_MIN_LENGTH, CHANNEL_NAME_RANGE_MESSAGE)
    .max(CHANNEL_NAME_MAX_LENGTH, CHANNEL_NAME_RANGE_MESSAGE),
});

export const modalSchema = (channelsByName) => {
  const additionalSchema = yup.object({
    name: yup.string().trim().notOneOf(channelsByName, 'Must be unique'),
  });

  return baseModalSchema.concat(additionalSchema);
};

export const chatSchema = yup.object({
  body: yup.string().trim().required('Required'),
});
