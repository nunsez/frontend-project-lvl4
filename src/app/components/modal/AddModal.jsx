/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../../routes.js';
import { close } from '../../reducers/modal.js';

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;
const CHANNEL_NAME_VALIDATION_MESSAGE = `Must be ${CHANNEL_NAME_MIN_LENGTH} to ${CHANNEL_NAME_MAX_LENGTH} characters`;

const baseSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Required')
        .min(CHANNEL_NAME_MIN_LENGTH, CHANNEL_NAME_VALIDATION_MESSAGE)
        .max(CHANNEL_NAME_MAX_LENGTH, CHANNEL_NAME_VALIDATION_MESSAGE),
});

const ModalPanel = () => {
    const dispatch = useDispatch();
    const modalInfo = useSelector((state) => state.modalInfo);
    const [validateOnChange, setValidateOnChange] = useState(false);

    const getChannels = () => {
        const channels = useSelector((state) => state.channelsInfo.channels);
        return channels.map((c) => c.name);
    };

    const additionalSchema = yup.object().shape({
        name: yup.string().notOneOf(getChannels(), 'Must be unique'),
    });
    const validationSchema = baseSchema.concat(additionalSchema);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleHideModal = () => {
        dispatch(close());
    };

    const f = useFormik({
        initialValues: { name: '' },
        validateOnBlur: false,
        validateOnChange,
        validationSchema,
        onSubmit: async ({ name }, { resetForm }) => {
            const path = routes.channelsPath();
            try {
                await axios.post(path, { data: { attributes: { name } } });
                resetForm();
                handleHideModal();
            } catch (e) {
                console.log('AXIOS ERROR', e);
            }
        },
    });

    const inputClass = cn('mb-2 form-control', { 'is-invalid': f.errors.name });

    return (
        <Modal show={modalInfo.isOpened} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalInfo.type}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="" noValidate onSubmit={f.handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            ref={inputRef}
                            onBlur={f.handleBlur}
                            onChange={f.handleChange}
                            className={inputClass}
                            name="name"
                            value={f.values.name}
                            readOnly={f.isSubmitting}
                        />
                        {f.errors.name && <div className="d-block mb-2 invalid-feedback">{f.errors.name}</div>}
                        <div className="d-flex justify-content-end">
                            <Button onClick={handleHideModal} className="mr-2" variant="secondary">
                                Cancel
                            </Button>
                            <Button
                                disabled={f.isSubmitting}
                                type="submit"
                                variant="primary"
                                onClick={() => setValidateOnChange(true)}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalPanel;
