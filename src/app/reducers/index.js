import channelsReducer from './channels.js';
import messagesReducer from './messages.js';
import modalReducer from './modal.js';
import languageReducer from './language.js';

export default {
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  languagesInfo: languageReducer,
  modalInfo: modalReducer,
};
