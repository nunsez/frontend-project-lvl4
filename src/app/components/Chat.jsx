import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import NicknameContext from '../nicknameContext.js';
import routes from '../../routes.js';
import { chatSchema as validationSchema } from '../validators.js';

const InputTextForm = () => {
    const currentChannelId = useSelector(({ channelsInfo }) => channelsInfo.currentChannelId);
    const nickname = useContext(NicknameContext);
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
            const attributes = { body, nickname };
            const path = routes.channelMessagesPath(currentChannelId);

            try {
                await axios.post(path, { data: { attributes } });
                resetForm();
                inputEl.current.focus();
            } catch (e) {
                console.log('AXIOS ERROR', e);
            }
        },
    });

    const inputGroupClass = cn('input-group', { 'has-validation': f.errors.body });
    const inputClass = cn('form-control', { 'is-invalid': f.errors.body });

    return (
        <div className="mt-auto">
            <form noValidate className="" onSubmit={f.handleSubmit}>
                <div className={inputGroupClass}>
                    <input
                        name="body"
                        aria-label="body"
                        ref={inputEl}
                        className={inputClass}
                        value={f.values.body}
                        onChange={f.handleChange}
                        onBlur={f.handleBlur}
                        readOnly={f.isSubmitting}
                    />
                    <div className="input-group-append">
                        <button disabled={f.isSubmitting} aria-label="submit" type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    {f.errors.body && <div className="invalid-feedback">{f.errors.body}</div>}
                </div>
            </form>
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
            {body}
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
