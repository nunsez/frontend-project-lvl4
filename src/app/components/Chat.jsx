import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../reducers/messages.js';

const InputTextForm = () => {
    const dispatch = useDispatch();

    const f = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: ({ body }, { resetForm }) => {
            const message = { body, id: _.uniqueId() };

            dispatch(addMessage({ message }));
            resetForm({});
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
                    />
                    <div className="input-group-append">
                        <button aria-label="submit" type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    {/* <div className="invalid-feedback">Required</div> */}
                </div>
            </form>
        </div>
    );
};

const MessagesBox = ({ messages }) => {
    const renderMessage = ({ body, id }) => (
        <div key={id} className="text-break">
            <b>Name</b>
            {': '}
            {body}
        </div>
    );

    return (
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
            {messages.map(renderMessage)}
        </div>
    );
};

MessagesBox.defaultProps = {
    messages: [],
};

MessagesBox.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
};

const Chat = () => {
    const messages = useSelector((state) => state.messagesInfo.messages);
    // const filteredMessages = messages.filter((m) => m.channelId === currentChannelId);

    return (
        <div className="col h-100 border-right">
            <div className="d-flex flex-column h-100">
                <MessagesBox messages={messages} />
                <InputTextForm />
            </div>
        </div>
    );
};

export default Chat;
