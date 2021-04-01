import React, { useContext, useEffect, useRef } from 'react';
import { InputGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import NicknameContext from '../nicknameContext.js';
import routes from '../../routes.js';
import { chatMessageValidate as validate } from '../validators.js';
import RollbarContext from '../rollbarContext.js';

const InputTextForm = () => {
  const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
  const nickname = useContext(NicknameContext);
  const rollbar = useContext(RollbarContext);

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  const f = useFormik({
    initialValues: {
      body: '',
    },
    validateOnBlur: false,
    validate,
    onSubmit: async ({ body }, { resetForm }) => {
      const attributes = { body, nickname };
      const path = routes.channelMessagesPath(currentChannelId);

      try {
        await axios.post(path, { data: { attributes } });
        resetForm();
        inputEl.current.focus();
      } catch (e) {
        const extra = { nickname, inChannel: currentChannelId };
        rollbar.error('axios chat error', e, extra);
      }
    },
  });

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
            isInvalid={!!f.errors.body}
          />
          <InputGroup.Append>
            <Button disabled={f.isSubmitting} type="submit" aria-label="submit">
              Submit
            </Button>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">{f.errors.body}</Form.Control.Feedback>
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

  useEffect(() => {
    messagesBoxEl.current.scrollTop = messagesBoxEl.current.scrollHeight;
  }, [activeChannelMessages]);

  const renderMessage = ({ body, id, nickname }) => (
    <div key={id} className="text-break">
      <b>{nickname}</b>
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
