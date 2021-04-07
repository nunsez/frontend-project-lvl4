import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import routes from '../../routes.js';
import rollbar from '../rollbar.js';
import { chatMessagesSchema as validationSchema } from '../validators.js';
import Context from '../context.js';

const scrollChatToBottom = () => {
  scroll.scrollToBottom({
    containerId: 'messages-box',
    smooth: 'easeOutCubic',
    duration: 300,
  });
};

const InputTextForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const { userName } = useContext(Context);

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  const f = useFormik({
    initialValues: {
      body: '',
    },
    validateOnBlur: false,
    validationSchema,
    onSubmit: async ({ body }, { resetForm }) => {
      const attributes = { body, userName };
      const path = routes.channelMessagesPath(currentChannelId);

      try {
        await axios.post(path, { data: { attributes } });
        resetForm();
      } catch (e) {
        const extra = { userName, inChannel: currentChannelId };
        rollbar.error('axios chat error', e, extra);
      } finally {
        inputEl.current.focus();
      }
    },
  });

  useEffect(scrollChatToBottom, [f.errors.body]);

  return (
    <div className="mt-auto">
      <Form noValidate onSubmit={f.handleSubmit}>
        <InputGroup hasValidation={!!f.errors.body}>
          <Form.Control
            name="body"
            aria-label="body"
            ref={inputEl}
            value={f.values.body}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            readOnly={f.isSubmitting}
            isInvalid={f.errors.body?.key}
            className=" "
          />
          <InputGroup.Append>
            <Button
              disabled={f.isSubmitting}
              type="submit"
              aria-label="submit"
              className="ml-2 rounded"
            >
              {t('chat.Submit')}
            </Button>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">{t(f.errors.body?.key)}</Form.Control.Feedback>
        </InputGroup>
      </Form>
    </div>
  );
};

const MessagesBox = () => {
  const messagesBoxEl = useRef();
  const allMessages = useSelector(({ messagesInfo }) => messagesInfo.messages);
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const activeChannelMessages = allMessages.filter((m) => m.channelId === currentChannelId);

  useEffect(scrollChatToBottom, [activeChannelMessages]);

  const renderMessage = ({ body, id, userName }) => (
    <div key={id} className="text-break">
      <b>{userName}</b>
      {': '}
      {body.trim()}
    </div>
  );

  return (
    <div ref={messagesBoxEl} id="messages-box" className="chat-messages overflow-auto mb-3">
      {activeChannelMessages.map(renderMessage)}
    </div>
  );
};

const Chat = () => (
  <div className="col h-100 border-right">
    <div className="d-flex flex-column h-100">
      <MessagesBox />
      <InputTextForm />
    </div>
  </div>
);

export default Chat;
