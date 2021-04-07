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
import rollbar from '../../utils/rollbar.js';
import { getChannelNamesSchema } from '../../utils/validators.js';
import { closeModal } from '../../reducers/modal.js';
import Context from '../../utils/context.js';

const ModalPanel = () => {
  const [shouldValidate, setShouldValidate] = useState(false);
  const { userName } = useContext(Context);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isOpened,
    extra: { channelId, channelName },
  } = useSelector((state) => state.modalInfo);
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
    validationSchema: getChannelNamesSchema(channelsByName),
    onSubmit: async ({ name }) => {
      const path = routes.channelPath(channelId);

      try {
        await axios.patch(path, { data: { attributes: { name } } });
        handleHideModal();
      } catch (e) {
        const extra = { userName, inChannel: channelId };
        rollbar.error('axios rename channel error', e, extra);
      }
    },
  });

  useEffect(() => {
    if (f.dirty || f.submitCount > 0) setShouldValidate(true);
  });

  const renderFeedback = (field) => {
    if (!f.errors[field]) {
      return null;
    }

    const { key, min = '', max = '' } = f.errors[field];

    return t(key, { min, max });
  };

  return (
    <Modal show={isOpened} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.Rename channel')}</Modal.Title>
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
              isInvalid={shouldValidate && f.touched.name && f.errors.name?.key}
            />
            <Form.Control.Feedback type="invalid" className="d-block mb-2">
              {shouldValidate && f.touched.name && renderFeedback('name')}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={handleHideModal} className="mr-2" variant="secondary">
                {t('modal.Cancel')}
              </Button>
              <Button disabled={f.isSubmitting} type="submit" variant="primary">
                {t('modal.RenameSubmit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPanel;
