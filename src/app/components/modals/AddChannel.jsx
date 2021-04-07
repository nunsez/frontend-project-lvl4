/* eslint-disable no-template-curly-in-string, newline-per-chained-call */

import axios from 'axios';
// prettier-ignore
import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import routes from '../../../routes.js';
import { getChannelNamesSchema } from '../../validators.js';
import { closeModal } from '../../reducers/modal.js';
import Context from '../../context.js';

const ModalPanel = () => {
  const [wasDirty, setWasDirty] = useState(false);
  const { userName, rollbar } = useContext(Context);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);

  const channelsByName = channels.map((c) => c.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleHideModal = () => {
    dispatch(closeModal());
  };

  const f = useFormik({
    initialValues: { name: '' },
    validationSchema: getChannelNamesSchema(channelsByName),
    onSubmit: async ({ name }) => {
      const path = routes.channelsPath();

      try {
        await axios.post(path, { data: { attributes: { name } } });
        handleHideModal();
      } catch (e) {
        const extra = { userName };
        rollbar.error('axios remove channel error', e, extra);
      }
    },
  });

  useEffect(() => {
    if (f.dirty) setWasDirty(true);
  });

  return (
    <Modal show={isOpened} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.Add channel')}</Modal.Title>
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
              isInvalid={wasDirty && f.touched.name && f.errors.name}
            />
            <Form.Control.Feedback type="invalid" className="d-block mb-2">
              {wasDirty && f.touched.name && t(f.errors.name)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={handleHideModal} className="mr-2" variant="secondary">
                {t('modal.Cancel')}
              </Button>
              <Button disabled={f.isSubmitting} type="submit" variant="primary">
                {t('modal.AddSubmit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPanel;
