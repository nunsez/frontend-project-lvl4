/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../../routes.js';
import { closeModal } from '../../reducers/modal.js';

const ModalPanel = () => {
    const dispatch = useDispatch();
    const {
        isOpened,
        extra: { channelId },
    } = useSelector((state) => state.modalInfo);

    const handleHideModal = () => {
        dispatch(closeModal());
    };

    const handleRemoveChannel = async () => {
        const path = routes.channelPath(channelId);

        try {
            await axios.delete(path);
            dispatch(closeModal());
        } catch (e) {
            console.log('AXIOS ERROR', e);
        }
    };

    return (
        <Modal show={isOpened} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Remove channel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure?
                <div className="d-flex justify-content-between">
                    <Button onClick={handleHideModal} className="mr-2" variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveChannel} variant="danger">
                        Confirm
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalPanel;