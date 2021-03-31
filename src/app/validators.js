import * as yup from 'yup';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;
const CHANNEL_NAME_VALIDATION_MESSAGE = `Must be ${CHANNEL_NAME_MIN_LENGTH} to ${CHANNEL_NAME_MAX_LENGTH} characters`;

export const modalSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Required')
        .min(CHANNEL_NAME_MIN_LENGTH, CHANNEL_NAME_VALIDATION_MESSAGE)
        .max(CHANNEL_NAME_MAX_LENGTH, CHANNEL_NAME_VALIDATION_MESSAGE),
});

export const chatSchema = yup.object().shape({
    body: yup.string().trim().required('Required'),
});
