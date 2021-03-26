import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const ModalPanel = ({ setModalInfo, ModalInfo }) => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleHideModal = () => {
        setModalInfo((curState) => ({ ...curState, state: 'hide' }));
    };

    const f = useFormik({
        initialValues: { name: '' },
        onSubmit: (_values, { resetForm }) => {
            resetForm({});
            handleHideModal();
        },
    });

    return (
        <Modal show={ModalInfo.state === 'show'} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{ModalInfo.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="" noValidate onSubmit={f.handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            ref={inputRef}
                            onBlur={f.handleBlur}
                            onChange={f.handleChange}
                            className="mb-2"
                            name="name"
                            value={f.values.name}
                        />
                        <div className="d-flex justify-content-end">
                            <Button onClick={handleHideModal} className="mr-2" variant="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

ModalPanel.propTypes = {
    ModalInfo: PropTypes.shape({
        state: PropTypes.string.isRequired,
        title: PropTypes.string,
    }).isRequired,
    setModalInfo: PropTypes.func.isRequired,
};

export default ModalPanel;
