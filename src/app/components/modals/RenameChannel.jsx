/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

import axios from 'axios';
// prettier-ignore
import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import routes from '../../../routes.js';
import { getChannelNamesSchema } from '../../validators.js';
import { closeModal } from '../../reducers/modal.js';
import Context from '../../context.js';

const ModalPanel = () => {
  const dispatch = useDispatch();
  const { userName, rollbar } = useContext(Context);
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
    validateOnChange,
    validationSchema: getChannelNamesSchema(channelsByName),
    onSubmit: async ({ name }, actions) => {
      const path = routes.channelPath(channelId);
      console.log('actions', actions);

      try {
        await axios.patch(path, { data: { attributes: { name } } });
        handleHideModal();
      } catch (e) {
        const extra = { userName, inChannel: channelId };
        rollbar.error('axios rename channel error', e, extra);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidateOnChange(true);
    f.handleSubmit(e);
  };

  const handleBlur = (e) => {
    setValidateOnChange(true);
    f.handleBlur(e);
  };

  return (
    <Modal show={isOpened} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename a channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="" noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onBlur={handleBlur}
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
              <Button disabled={f.isSubmitting} type="submit" variant="primary">
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
