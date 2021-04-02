import React from 'react';
import propTypes from 'prop-types';
// prettier-ignore
import {
  Dropdown, ButtonGroup, Button, Nav,
} from 'react-bootstrap';

// prettier-ignore
const DropdownWrapper = ({
  children, variant, onRemove, onRename,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex mb-2">
    {children}
    <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
    <Dropdown.Menu>
      <Dropdown.Item onClick={onRemove}>Remove</Dropdown.Item>
      <Dropdown.Item onClick={onRename}>Rename</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

DropdownWrapper.propTypes = {
  children: propTypes.element.isRequired,
  variant: propTypes.oneOf(['primary', 'light']).isRequired,
  onRemove: propTypes.func.isRequired,
  onRename: propTypes.func.isRequired,
};

// prettier-ignore
const ChannelItem = ({
  channel, handleSwitchChannel, handleOpenModal, getVariant,
}) => {
  const { id, name, removable } = channel;
  const variant = getVariant(id);

  const ChannelButton = ({ className }) => (
    <Nav.Link as={Button} onClick={handleSwitchChannel(id)} className={className} variant={variant}>
      {name.trim()}
    </Nav.Link>
  );

  Nav.Link.propTypes = {
    onClick: propTypes.func.isRequired,
    className: propTypes.string.isRequired,
    variant: propTypes.oneOf(['primary', 'light']).isRequired,
  };

  if (!removable) {
    return <ChannelButton className="text-left btn-block mb-2" />;
  }

  return (
    <DropdownWrapper
      variant={variant}
      onRemove={handleOpenModal({ id, type: 'RemoveChannel' })}
      onRename={handleOpenModal({ id, type: 'RenameChannel', name })}
    >
      <ChannelButton className="text-left flex-grow-1" />
    </DropdownWrapper>
  );
};

ChannelItem.defaultProps = {
  channel: {
    removable: true,
  },
};

ChannelItem.propTypes = {
  channel: propTypes.exact({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    removable: propTypes.bool,
  }),
  handleSwitchChannel: propTypes.func.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  getVariant: propTypes.func.isRequired,
};

export default ChannelItem;
