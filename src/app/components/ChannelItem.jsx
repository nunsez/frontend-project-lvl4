import React from 'react';
import propTypes from 'prop-types';
// prettier-ignore
import {
  Dropdown, ButtonGroup, Button, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// prettier-ignore
const DropdownWrapper = ({
  children, variant, onRemove, onRename,
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      {children}
      <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={onRemove}>{t('Remove')}</Dropdown.Item>
        <Dropdown.Item onClick={onRename}>{t('Rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownWrapper.propTypes = {
  children: propTypes.element.isRequired,
  variant: propTypes.oneOf(['primary', 'light']).isRequired,
  onRemove: propTypes.func.isRequired,
  onRename: propTypes.func.isRequired,
};

// prettier-ignore
const ChannelItem = ({
  name, removable, variant, handleSwitchChannel, handleOpenModal,
}) => {
  const ChannelButton = ({ className }) => (
    <Nav.Link as={Button} onClick={handleSwitchChannel} className={className} variant={variant}>
      {name.trim()}
    </Nav.Link>
  );

  ChannelButton.propTypes = {
    className: propTypes.string.isRequired,
  };

  if (!removable) {
    return <ChannelButton className="text-left btn-block mb-2" />;
  }

  return (
    <DropdownWrapper
      variant={variant}
      onRemove={handleOpenModal({ type: 'RemoveChannel' })}
      onRename={handleOpenModal({ type: 'RenameChannel', name })}
    >
      <ChannelButton className="text-left flex-grow-1" />
    </DropdownWrapper>
  );
};

ChannelItem.defaultProps = {
  removable: true,
};

ChannelItem.propTypes = {
  name: propTypes.string.isRequired,
  removable: propTypes.bool,
  variant: propTypes.oneOf(['primary', 'light']).isRequired,
  handleSwitchChannel: propTypes.func.isRequired,
  handleOpenModal: propTypes.func.isRequired,
};

export default ChannelItem;
