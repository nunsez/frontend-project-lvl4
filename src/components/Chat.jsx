import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const InputTextForm = () => {
    const f = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: (_values, { resetForm }) => {
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

const renderMessage = () => null;

const renderMessagesBox = (messages) => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages.map(renderMessage)}
    </div>
);

const Chat = ({ messages }) => (
    <div className="col h-100 border-right">
        <div className="d-flex flex-column h-100">
            {renderMessagesBox(messages)}
            {InputTextForm()}
        </div>
    </div>
);

Chat.defaultProps = {
    messages: [],
};

Chat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default Chat;
