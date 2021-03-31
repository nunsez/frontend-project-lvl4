/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../../routes.js';
import { closeModal } from '../../reducers/modal.js';
import { modalSchema as baseSchema } from '../../validators.js';

const ModalPanel = () => {
    const dispatch = useDispatch();
    const { isOpened } = useSelector((state) => state.modalInfo);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
    const channelsByName = channels.map((c) => c.name);

    const additionalSchema = yup.object().shape({
        name: yup.string().notOneOf(channelsByName, 'Must be unique'),
    });
    const validationSchema = baseSchema.concat(additionalSchema);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleHideModal = () => {
        dispatch(closeModal());
    };

    const f = useFormik({
        initialValues: { name: '' },
        validateOnBlur: false,
        validateOnChange,
        validationSchema,
        onSubmit: async ({ name }) => {
            const path = routes.channelsPath();

            try {
                await axios.post(path, { data: { attributes: { name } } });
                handleHideModal();
            } catch (e) {
                console.log('AXIOS ERROR', e);
            }
        },
    });

    const inputClass = cn('mb-2 form-control', { 'is-invalid': f.errors.name });

    return (
        <Modal show={isOpened} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add a channel</Modal.Title>
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
