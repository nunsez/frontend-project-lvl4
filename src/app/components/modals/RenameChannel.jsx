/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

// prettier-ignore
import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../../../routes.js';
import { closeModal } from '../../reducers/modal.js';
import { channelNameValidate } from '../../validators.js';
import RollbarContext from '../../rollbarContext.js';
import NicknameContext from '../../nicknameContext.js';

const ModalPanel = () => {
  const dispatch = useDispatch();
  const rollbar = useContext(RollbarContext);
  const nickname = useContext(NicknameContext);
  const {
    isOpened,
    extra: { channelId, channelName },
  } = useSelector((state) => state.modalInfo);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const channelsByName = channels.map((c) => c.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleHideModal = () => {
    dispatch(closeModal());
  };

  const f = useFormik({
    initialValues: { name: channelName },
    validateOnBlur: false,
    validateOnChange,
    validate: channelNameValidate(channelsByName),
    onSubmit: async ({ name }) => {
      const path = routes.channelPath(channelId);

      try {
        await axios.patch(path, { data: { attributes: { name } } });
        dispatch(closeModal());
      } catch (e) {
        const extra = { nickname, inChannel: channelId };
        rollbar.error('axios rename channel error', e, extra);
      }
    },
  });

  return (
    <Modal show={isOpened} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename a channel</Modal.Title>
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
              readOnly={f.isSubmitting}
              isInvalid={!!f.errors.name}
            />
            <Form.Control.Feedback type="invalid" className="d-block mb-2">
              {f.errors.name}
            </Form.Control.Feedback>
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
