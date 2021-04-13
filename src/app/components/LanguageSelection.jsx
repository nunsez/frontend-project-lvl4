import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import propTypes from 'prop-types';

import { getAvaibleLanguages } from '../locales';

const renderLanguage = ({ name, tag }) => (
  <option key={tag} value={tag}>{`${name} (${tag.toUpperCase()})`}</option>
);

const LanguageSelection = ({ onChange }) => {
  const { t } = useTranslation();
  const { activeLanguage } = useSelector((state) => state.languagesInfo);
  const avaibleLanguages = getAvaibleLanguages();

  return (
    <Form.Group className="mb-4">
      <Form.Label>{t('Change language')}</Form.Label>
      <Form.Control as="select" custom onChange={onChange} defaultValue={activeLanguage}>
        {avaibleLanguages.map(renderLanguage)}
      </Form.Control>
    </Form.Group>
  );
};

LanguageSelection.propTypes = {
  onChange: propTypes.func.isRequired,
};

export default LanguageSelection;
