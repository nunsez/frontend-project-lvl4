import React, { useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../reducers/messages.js';
import NicknameContext from '../nicknameContext.js';
import routes from '../../routes.js';

const socket = io();

// socket event logger
socket.onAny(console.log);

const InputTextForm = () => {
    const nickname = useContext(NicknameContext);

    const f = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: async ({ body }, { resetForm }) => {
            const attributes = { body, nickname };
            const path = routes.channelMessagesPath(1);

            try {
                await axios.post(path, { data: { attributes } });
                resetForm();
            } catch (e) {
                console.log('AXIOS ERROR', e);
            }
        },
    });

    return (
        <div className="mt-auto">
            <form noValidate className="" onSubmit={f.handleSubmit}>
                <div className="input-group">
                    <input
                        name="body"
                        aria-label="body"
                        className="form-control"
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
                    {/* <div className="invalid-feedback">Required</div> */}
                </div>
            </form>
        </div>
    );
};

const MessagesBox = () => {
    const messagesBoxEl = useRef();
    const dispatch = useDispatch();
    const messages = useSelector(({ messagesInfo }) => messagesInfo.messages);

    useEffect(() => {
        messagesBoxEl.current.scrollTop = messagesBoxEl.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        socket.on('newMessage', ({ data }) => {
            const { type, /* id, */ attributes } = data;

            if (type === 'messages') {
                dispatch(addMessage({ attributes }));
            }
        });

        return () => {
            console.log('cleanup socket listener');
            socket.removeAllListeners();
        };
    }, []);

    const renderMessage = ({ body, id, nickname }) => (
        <div key={id} className="text-break">
            <b>{nickname}</b>
            {': '}
            {body}
        </div>
    );

    return (
        <div ref={messagesBoxEl} id="messages-box" className="chat-messages overflow-auto mb-3">
            {messages.map(renderMessage)}
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
